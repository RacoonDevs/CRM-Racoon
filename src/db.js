import { createPool } from "mysql2/promise";

import { DB_HOST, DB_PORT, DB_USER, DB_NAME, DB_PASS } from "./config.js";

export const pool = createPool({
  host: DB_HOST,
  port: DB_PORT,
  database: DB_NAME,
  user: DB_USER,
  password: DB_PASS,
});
