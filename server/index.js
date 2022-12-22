import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("hello from simple server :)");
});

app.listen(port, (req, res) => {
  console.log(`listening on port ${port}`);
});
