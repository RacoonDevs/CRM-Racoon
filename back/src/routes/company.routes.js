import { Router } from "express";
import * as companyController from "../controllers/company.controllers.js";
const router = Router();

router.get("/", companyController.getCompanis);

router.get("/:id", companyController.getCompanyById);

router.post("/", companyController.createCompany);

router.patch("/:id", companyController.updateCompanyById);

router.delete("/:id", companyController.deleteCompanyById);

export default router;
