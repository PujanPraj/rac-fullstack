import { Router } from "express";
import {
  getUserById,
  loginUser,
  logoutUser,
  registerUser,
  deleteUser,
  getAllUsers,
} from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.js";
import { authMiddleware, isAdmin } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/registerUser").post(upload.single("avatar"), registerUser);
router.route("/loginUser").post(loginUser);
router.route("/logoutUser").post(authMiddleware, logoutUser);
router.route("/me").get(authMiddleware, getUserById);
router.route("/").get(getAllUsers);
router.route("/:userId").delete(authMiddleware, isAdmin, deleteUser);

export default router;
