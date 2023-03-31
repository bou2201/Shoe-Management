import mongoose, { Schema } from "mongoose";

const CartItemSchema = mongoose.Schema({
  shoeId: {
    type: Schema.Types.ObjectId,
    ref: "shoes",
  },
  name: {
    type: String,
    ref: "shoes.name",
  },
  brand: {
    type: String,
    ref: "shoes.brand",
  },
  price: {
    type: String,
    required: "shoes.price",
  },
  image: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    enum: ["36", "37", "38", "39", "40", "41", "42", "43", "44"],
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  quantityMax: {
    type: Number,
  }
});

const CartSchema = mongoose.Schema({
  items: [CartItemSchema],
  admin: {
    type: Schema.Types.ObjectId,
    ref: "admins",
  },
});

const Cart = mongoose.model("carts", CartSchema);

export default Cart;
