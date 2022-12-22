import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/index.js";
const router = Router();

router.post("/signUp", authController.signUp);

router.post("/signIn", authController.signIn);

router.put("/:id", verifyToken, authController.updateUser);

router.put("/updatePassword/:id", verifyToken, authController.updatePassword);

router.delete("/:id", verifyToken, authController.deleteUserById);

export default router;
