import { Router } from "express";
import {
  createPastPresidents,
  deletePastPresidents,
  getAllPastPresidents,
  getPastPresidentById,
  updatePastPresidents,
} from "../controllers/pastPresident.controllers.js";
import { upload } from "../middlewares/multer.js";
const router = Router();

router.route("/").post(upload.single("image"), createPastPresidents);

router.route("/").get(getAllPastPresidents);

router.route("/:id").put(upload.single("image"), updatePastPresidents);
router.route("/:id").delete(deletePastPresidents).get(getPastPresidentById);

export default router;
