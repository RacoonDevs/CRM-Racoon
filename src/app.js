import express from "express";
import cors from "cors";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.routes.js";
import pingRoutes from "./routes/ping.routes.js";
import usersRoutes from "./routes/users.routes.js";
import teamRoutes from "./routes/teams.routes.js";
import { verifyToken } from "./middlewares/index.js";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(cors());

app.use(express.json());

app.use("/api", pingRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", verifyToken, usersRoutes);
app.use("/api/team", verifyToken, teamRoutes);

app.use(express.static(join(__dirname, "../front/build")));

app.use((req, res, next) => {
  res.status(404).json({
    message: "Not Found",
  });
});

export default app;
