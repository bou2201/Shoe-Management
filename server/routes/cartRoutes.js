import express from "express";
import { getCart, addToCart, removeCartItem } from "../controllers/cart.js";

const router = express.Router();

router.get("/:adminId", getCart);
router.post("/:adminId", addToCart);
router.delete("/:adminId/:id", removeCartItem);

export default router;
