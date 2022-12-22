import { Router } from "express";
import { ping, pingAuth } from "../controllers/ping.controller.js";
import { verifyToken } from "../middlewares/index.js";

const router = Router();

router.get("/ping", ping);
router.get("/auth/pingAuth", verifyToken, pingAuth);

export default router;
