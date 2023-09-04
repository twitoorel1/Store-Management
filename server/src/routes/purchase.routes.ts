import express from 'express';
import catchAsyncError from '../errors/catchAsyncError';
import purchaseController from '../controllers/purchase.controllers';
import { authRole } from '../middlewares/auth.middleware';
import { EUserRoles } from '../types/global';

const router = express.Router();

router.route('/').get(catchAsyncError(purchaseController.getAll)).post(catchAsyncError(purchaseController.createOne));

router
	.route('/id/:id')
	.get(authRole(EUserRoles.admin), catchAsyncError(purchaseController.getOneById))
	.patch(authRole(EUserRoles.admin), catchAsyncError(purchaseController.updateOneById))
	.delete(authRole(EUserRoles.admin), catchAsyncError(purchaseController.deleteOneById));

router.get('/totalPurchase', catchAsyncError(purchaseController.totalPurchase));

// Make Route For Get All Purchases By User Id
router.get('/user/:userId', catchAsyncError(purchaseController.getAllPurchasesByUserId));

export default router;
