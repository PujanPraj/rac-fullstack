import { Router } from "express";
import {
  createMembers,
  deleteMembers,
  getAllMembers,
  getMembersById,
  updateMembers,
} from "../controllers/members.controllers.js";
import { upload } from "../middlewares/multer.js";
const router = Router();

router.route("/").post(upload.single("image"), createMembers);

router.route("/").get(getAllMembers);

router.route("/:id").put(upload.single("image"), updateMembers);
router.route("/:id").delete(deleteMembers).get(getMembersById);

export default router;
