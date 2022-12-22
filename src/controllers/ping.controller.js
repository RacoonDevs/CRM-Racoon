import { pool } from "../db.js";

export const ping = async (req, res) => {
  const [result] = await pool.query("SELECT 1 + 1 AS result");
  res.json(result[0]);
};
export const pingAuth = async (req, res) => {
  await res.json({ message: "isAuth" });
};
