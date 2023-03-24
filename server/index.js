import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import adminRoutes from "./routes/adminRoutes.js";
import shoeRoutes from "./routes/shoeRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/admin", adminRoutes);
app.use("/api/shoes", shoeRoutes);
app.use("/api/cart", cartRoutes);

const PORT = process.env.PORT || 5000;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_CLUSTER = process.env.DB_CLUSTER;
const DB_URL = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_CLUSTER}.qay2l3e.mongodb.net/?retryWrites=true&w=majority`;

app.get("/", (req, res) => {
  res.send("Server is running ...");
});

try {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "Shoe_management_DB",
    })
    .then(() =>
      app.listen(PORT, (req, res) => console.log(`listening on port ${PORT}`))
    )
    .catch((err) => console.error(err));

  console.log("Connected to Mongo");
} catch (err) {
  console.log(err);
}
