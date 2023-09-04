import express from 'express';
import catchAsyncError from '../errors/catchAsyncError';
import authController from '../controllers/auth.controllers';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/login', catchAsyncError(authController.login));
router.post('/register', catchAsyncError(authController.register));
router.post('/isLogin', authMiddleware, catchAsyncError(authController.isLogin));
router.post('/logout', authMiddleware, catchAsyncError(authController.logout));

export default router;
