import mongoose, { Schema } from "mongoose";
import moment from "moment";

const OrderSchema = mongoose.Schema({
  customer: {
    type: Schema.Types.ObjectId,
    rel: "customers",
  },
  cart: {
    type: Schema.Types.ObjectId,
    rel: "carts",
  },
  totalDue: {
    type: Number,
    default: 0,
  },
  createAt: { type: Number, default: () => moment().format("LLLL") },
});

const Order = mongoose.model("orders", OrderSchema);

export default Order;
