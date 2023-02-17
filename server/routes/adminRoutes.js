import express from "express";
import verifyToken from "../middleware/auth.js";
import { login, isLoggedIn, register } from "../controllers/admin.js";

const router = express.Router();

router.get("/", verifyToken, isLoggedIn);
router.post("/login", login);
router.post("/register", register);

export default router;
