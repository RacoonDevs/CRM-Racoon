import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import pingRoutes from "./routes/ping.routes.js";
import usersRoutes from "./routes/users.routes.js";
import companyRoutes from "./routes/company.routes.js";
import { verifyToken } from "./middlewares/index.js";

const app = express();
app.use(cors());

app.use(express.json());

app.use("/api", pingRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", verifyToken, usersRoutes);
app.use("/api/company", verifyToken, companyRoutes);

app.use((req, res, next) => {
  res.status(404).json({
    message: "Not Found",
  });
});

export default app;
