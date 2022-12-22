import jwt from "jsonwebtoken";
import { SECRET } from "../config.js";
import { pool } from "../db.js";

export const verifyToken = async (req, res, next) => {
  const token = req.headers["x-access-token"];

  try {
    if (!token) return res.status(403).json({ message: "No token provided" });

    const decoded = jwt.verify(token, SECRET);

    const user = await pool.query(
      "SELECT * FROM user WHERE  id = ?",
      decoded.id
    );
    if (!user) return res.status(403).json({ message: "Token invalid" });
    next();
  } catch (error) {
    console.log(Date.now + ": " + "Verificacion failer");
    console.log(error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
