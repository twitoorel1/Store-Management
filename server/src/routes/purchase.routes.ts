import express from 'express';
import catchAsyncError from '../errors/catchAsyncError';
import purchaseController from '../controllers/purchase.controllers';
const router = express.Router();

router.route('/').get(catchAsyncError(purchaseController.getAll)).post(catchAsyncError(purchaseController.createOne));

router.route('/id/:id').get(catchAsyncError(purchaseController.getOneById)).put(catchAsyncError(purchaseController.updateOneById)).delete(catchAsyncError(purchaseController.deleteOneById));

router.get('/totalPurchase', catchAsyncError(purchaseController.totalPurchase));

export default router;
