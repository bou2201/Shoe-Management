import mongoose from "mongoose";

const regexPhone = /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/;

const CustomerSchema = mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
    match: regexPhone,
  },
});

const Customer = mongoose.model("customers", CustomerSchema);

export default Customer;
