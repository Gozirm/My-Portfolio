import express from "express";
import {
  create,
  createAdmin,
  getAllProjects,
  loginAdmin,
} from "../controller/create.js";

const router = express.Router();
router.post("/create", create);
router.get("/projects", getAllProjects);
router.post("/admin", createAdmin);
router.post("/logedin", loginAdmin);
export default router;
