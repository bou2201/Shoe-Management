import express from "express";
import {
  getShoes,
  getShoeDetails,
  createShoe,
  updateShoe,
  deleteShoe,
  getShoesByQuery,
} from "../controllers/shoe.js";
import uploadCloud from "../configs/cloudinary.config.js";

const router = express.Router();

router.get("/", getShoes);
router.get("/search", getShoesByQuery);
router.get("/:id", getShoeDetails);

router.post("/create", uploadCloud.array("image", 4), createShoe);

router.put("/update/:id", updateShoe) 

router.delete("/delete/:id", deleteShoe)

export default router;
