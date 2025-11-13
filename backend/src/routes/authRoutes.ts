import { Router } from "express";
import { AuthController } from "../controllers/authController"; 
import { authenticate } from "../middlewares/auth";

const router = Router();

router.post("/login", AuthController.login);
router.post("/signup", AuthController.signup);
router.get("/me", authenticate, AuthController.me);
router.post("/logout", AuthController.logout);

export default router;
