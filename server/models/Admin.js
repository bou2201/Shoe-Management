import mongoose from "mongoose";
import moment from "moment";

const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const AdminSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    match: regexEmail,
    required: true,
    unique: true,
  },
  password: { type: String, required: true },
  createdAt: {
    type: String,
    default: () => moment().format("LLLL"),
  },
});

const Admin = mongoose.model("admins", AdminSchema);

export default Admin;
