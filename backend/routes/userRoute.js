import express from 'express';
import { loginUser, registerUser } from '../controllers/userController.js';
import userModel from "../models/userModel.js";
import authMiddleware from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);

// ✅ NEW: Get profile using token (for StoreContext)
userRouter.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await userModel.findById(req.userId).select("-password");
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    res.json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default userRouter;
