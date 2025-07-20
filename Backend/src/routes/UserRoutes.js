import express from 'express';
import { getUserDetails, loginUser, logout, registerUser } from '../controllers/UserController.js';
const router=express.Router();

router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/getUserDetails",getUserDetails);
router.post("/logout",logout);

export default router;