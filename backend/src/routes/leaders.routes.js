import { Router } from "express";
import { upload } from "../middlewares/multer.js";
import {
  createLeader,
  deleteLeader,
  getAllLeaders,
  getLeaderById,
  updateLeader,
} from "../controllers/leaders.controllers.js";
const router = Router();

router.route("/").post(upload.single("img"), createLeader).get(getAllLeaders);

router
  .route("/:id")
  .get(getLeaderById)
  .put(upload.single("img"), updateLeader)
  .delete(deleteLeader);

export default router;
