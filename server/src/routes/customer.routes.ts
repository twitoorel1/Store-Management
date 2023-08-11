import express from 'express';
import catchAsyncError from '../errors/catchAsyncError';
import customerController from '../controllers/customer.controllers';
const router = express.Router();

router.route('/').get(catchAsyncError(customerController.getAll)).post(catchAsyncError(customerController.createOne));

router.route('/id/:id').get(catchAsyncError(customerController.getOneById)).put(catchAsyncError(customerController.updateOneById)).delete(catchAsyncError(customerController.deleteOneById));

router.get('/listPurchase/:productId', catchAsyncError(customerController.customersPurchase));

export default router;
