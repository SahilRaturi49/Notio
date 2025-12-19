import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controller.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", verifyJWT, logoutUser);

export default router;
