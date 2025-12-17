import express from "express";
const router = express.Router();
import { handelSignup, handelLogin, handelLogout } from "../controller/controller.Signup.js";


router.post("/signup", handelSignup);
router.post("/login", handelLogin);
router.post("/logout", handelLogout);

export default router;
