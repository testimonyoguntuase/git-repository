import express from "express"
import { registerUser, loginUser, getProfile } from "../controllers/userController.js"
import authMiddleware from "../middleware/authMiddleware.js"
const router = express.Router()
// import user from "../models/userModel.js"

router.post("/register", registerUser)
router.get("/login", loginUser)
router.get("/profile", authMiddleware, getProfile)

export default router