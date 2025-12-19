import { Router } from "express";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createNote,
  deleteNote,
  getAllNotes,
  getSingleNote,
  updateNote,
} from "../controllers/note.controller.js";

const router = Router();
router.use(verifyJWT);

router.post("/", createNote);
router.get("/", getAllNotes);
router.get("/:id", getSingleNote);
router.patch("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;
