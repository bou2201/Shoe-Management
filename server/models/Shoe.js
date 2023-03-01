import mongoose from "mongoose";
import moment from "moment";
import randomString from "randomString";

const ShoeSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  code: {
    type: String,
    default: () =>
      randomString.generate({
        length: 10,
        charset: "alphanumeric",
        capitalization: "uppercase",
      }),
  },
  brand: {
    type: String,
    enum: ["Nike", "MLB", "Oxford", "Vans", "Unknown"],
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
