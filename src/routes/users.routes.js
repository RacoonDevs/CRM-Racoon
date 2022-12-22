import { Router } from "express";
import * as userController from "../controllers/users.controllers.js";
const router = Router();

router.get("/", userController.getUsers);

router.get("/:id", userController.getUserById);

router.post("/", userController.createUser);

router.put("/:id", userController.updateUserById);

router.delete("/:id", userController.deleteUserById);

export default router;
