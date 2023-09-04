import express from 'express';
import catchAsyncError from '../errors/catchAsyncError';
import productController from '../controllers/product.controllers';
import { authRole } from '../middlewares/auth.middleware';
import { EUserRoles } from '../types/global';

const router = express.Router();

router.route('/').get(catchAsyncError(productController.getAll)).post(authRole(EUserRoles.admin), catchAsyncError(productController.createOne));

router
	.route('/id/:id')
	.get(authRole(EUserRoles.admin), catchAsyncError(productController.getOneById))
	.patch(authRole(EUserRoles.admin), catchAsyncError(productController.updateOneById))
	.delete(authRole(EUserRoles.admin), catchAsyncError(productController.deleteOneById));

router.get('/listPurchase/:customerId', catchAsyncError(productController.productsPurchase));

export default router;
