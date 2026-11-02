import express from "express"
import { createAllUsers } from "../controllers/userController.js"
const router = express.Router()
// import user from "../models/userModel.js"

router.post("/", createAllUsers)

export default router