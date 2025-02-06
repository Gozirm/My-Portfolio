import express from "express";
import {
  create,
  createAdmin,
  getAllProjects,
  getReviews,
  loginAdmin,
  reviewClients,
} from "../controller/create.js";

const router = express.Router();
router.post("/create", create);
router.get("/projects", getAllProjects);
router.post("/admin", createAdmin);
router.post("/logedin", loginAdmin);
router.post("/reviews", reviewClients);
router.get("/allreviews", getReviews);
export default router;
