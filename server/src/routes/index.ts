import express from 'express';
import formatUptime from '../utils/dates.util';
import { authMiddleware } from '../middlewares/auth.middleware';
// import { EUserRoles } from '../types/global';

import authRoutes from './auth.routes';
import productRoutes from './product.routes';
import customerRoutes from './customer.routes';
import purchaseRoutes from './purchase.routes';

const router = express.Router();

router.get('/', (req, res) => {
	res.status(200).json({ message: `Server Running ${formatUptime(process.uptime())}` });
});

router.use('/auth', authRoutes);
router.use('/product', authMiddleware, productRoutes);
router.use('/customer', authMiddleware, customerRoutes);
router.use('/purchase', authMiddleware, purchaseRoutes);

export default router;
