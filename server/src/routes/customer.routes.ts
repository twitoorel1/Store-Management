import express from 'express';
import catchAsyncError from '../errors/catchAsyncError';
import customerController from '../controllers/customer.controllers';
import { authRole } from '../middlewares/auth.middleware';
import { EUserRoles } from '../types/global';

const router = express.Router();

router.route('/').get(catchAsyncError(customerController.getAll)).post(authRole(EUserRoles.admin), catchAsyncError(customerController.createOne));

router
	.route('/id/:id')
	.get(authRole(EUserRoles.admin), catchAsyncError(customerController.getOneById))
	.patch(authRole(EUserRoles.admin), catchAsyncError(customerController.updateOneById))
	.delete(authRole(EUserRoles.admin), catchAsyncError(customerController.deleteOneById));

router.get('/listPurchase/:productId', catchAsyncError(customerController.customersPurchase));

export default router;
