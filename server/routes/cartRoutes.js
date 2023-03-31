import express from "express";
import {
  getCart,
  addToCart,
  removeCartItem,
  updateCart,
} from "../controllers/cart.js";

const router = express.Router();

router.get("/:adminId", getCart);
router.post("/:adminId", addToCart);
router.delete("/:adminId/:id", removeCartItem);
router.put("/update/:adminId", updateCart);

export default router;
