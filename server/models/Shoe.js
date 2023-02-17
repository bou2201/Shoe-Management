import mongoose from "mongoose";
import moment from "moment";

const randomCode = Math.random().toString(36).substring(2, 14).toUpperCase();

const ShoeSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: String, default: randomCode, unique: true },
  brand: {
    type: String,
    enum: ["Nike", "MLB", "Oxford", "Vans", "Local Brands", "Unknown"],
    default: "Unknown",
  },
  price: { type: String, require: true },
  image: { type: [String], require: true },
  variants: {
    type: [Object],
    size: {
      type: String,
      enum: ["36", "37", "38", "39", "40", "41", "42", "43", "44"],
      require: true,
    },
    quantity: {
      type: Number,
      min: 1,
      max: 99,
      required: true,
    },
  },
  status: {
    type: String,
    enum: ["In Stocks", "Out Of Stocks"],
    default: "In Stocks",
  },
  createdAt: {
    type: String,
    default: () => moment().format("LLLL"),
  },
  updateAt: {
    type: String,
    default: null,
  },
});

const Shoe = mongoose.model("shoes", ShoeSchema);

export default Shoe;
