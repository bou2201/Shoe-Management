import mongoose, { Schema } from "mongoose";

const CartItemSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  shoe: {
    type: Schema.Types.ObjectId,
    ref: "shoes",
    required: true,
  },
});

const CartSchema = mongoose.Schema({
  items: [CartItemSchema],
  count: { type: Number, default: 0 },
  totalPrice: { Type: Number, default: 0 },
});

const Cart = mongoose.model("carts", CartSchema);
const CartItem = mongoose.model("cartItems", CartItemSchema);

export { Cart, CartItem };
