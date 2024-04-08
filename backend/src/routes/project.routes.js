import { Router } from "express";
const router = Router();
import { upload } from "../middlewares/multer.js";
import {
  createProject,
  deleteProject,
  getAllProjects,
  getLatestProjects,
  getProjectById,
  getRandomProjects,
  updateProject,
} from "../controllers/project.controllers.js";

router.route("/").post(upload.single("img"), createProject).get(getAllProjects);

router.route("/latestProjects").get(getLatestProjects);
router.route("/randomProjects").get(getRandomProjects);

router
  .route("/:id")
  .put(upload.single("img"), updateProject)
  .delete(deleteProject)
  .get(getProjectById);

export default router;
