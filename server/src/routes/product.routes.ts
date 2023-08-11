import express from 'express';
import catchAsyncError from '../errors/catchAsyncError';
import productController from '../controllers/product.controllers';
// import { authRole } from '../middlewares/auth.middleware';
// import { EUserRoles } from '../types/global';

const router = express.Router();

router.route('/').get(catchAsyncError(productController.getAll)).post(catchAsyncError(productController.createOne));

router.route('/id/:id').get(catchAsyncError(productController.getOneById)).put(catchAsyncError(productController.updateOneById)).delete(catchAsyncError(productController.deleteOneById));

router.get('/listPurchase/:customerId', catchAsyncError(productController.productsPurchase));

export default router;
