import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET = process.env.SECRET_TOKEN;

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token not found", token: token });
  }

  try {
    const decoded = jwt.verify(token, SECRET);

    req.id = decoded.id;
    next();
  } catch (err) {
    console.log(err);
    return res.status(403).json(err.message);
  }
};

export default verifyToken;
