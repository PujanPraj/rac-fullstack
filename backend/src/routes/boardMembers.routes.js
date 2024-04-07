import { Router } from "express";
import {
  createBoardMembers,
  deleteBoardMembers,
  getAllBoardMembers,
  updateBoardMembers,
  getPresident,
  getBoardMemberById,
} from "../controllers/boardMembers.controllers.js";
import { upload } from "../middlewares/multer.js";
const router = Router();

router.route("/").post(upload.single("image"), createBoardMembers);

router.route("/").get(getAllBoardMembers);
router.route("/getPresident").get(getPresident);

router.route("/:id").put(upload.single("image"), updateBoardMembers);
router.route("/:id").delete(deleteBoardMembers).get(getBoardMemberById);

export default router;
