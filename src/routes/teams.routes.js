import { Router } from "express";
import * as teamController from "../controllers/teams.controllers.js";
const router = Router();

router.get("/", teamController.getTeams);

router.get("/:id", teamController.getTeamById);

router.post("/", teamController.createTeam);

router.put("/:id", teamController.updateTeamById);

router.delete("/:id", teamController.deleteTeamById);

export default router;
