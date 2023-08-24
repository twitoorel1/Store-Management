import { NextFunction, Request, Response } from 'express';
import Purchase from '../models/purchase.models';
import errorHandlerYup from '../errors/errorHandlerYup';
import errorHandler from '../errors/errorHandler';
import { NotFoundError } from '../errors/Errors';
import { createOnePurchaseSchema, updateOnePurchaseSchema } from '../validators/validateBody.schema';

async function createOne(req: Request, res: Response, next: NextFunction) {
	try {
		await createOnePurchaseSchema.validate(req.body, { abortEarly: false });
		const newPurchase = await Purchase.createOne(req.body);

		res.status(201).send({ error: false, message: 'Purchase Created Successfully', data: newPurchase });
	} catch (error: any) {
		if (error.name === 'ValidationError') {
			return errorHandlerYup(error, req, res, next);
		}
		if (error.name) {
			return errorHandler(error, req, res, next);
		}
		console.log(error.message);
	}
}

async function getAll(req: Request, res: Response, next: NextFunction) {
	try {
		const purchases = await Purchase.getAll();
		if (purchases === null) return next(new NotFoundError('Purchases not found'));
		res.status(200).send({ error: false, message: 'Get All Purchases Successfully', data: purchases });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Error From Get All - Purchase' });
	}
}

async function getOneById(req: Request, res: Response, next: NextFunction) {
	try {
		const purchaseById = await Purchase.getOneById(+req.params.id);
		if (purchaseById === null) return next(new NotFoundError('Purchase not found'));
		res.status(200).send({ error: false, message: `Get One Id Purchase: ${req.params.id} Successfully`, data: purchaseById });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Error From Get One By Id - Purchase' });
	}
}

async function deleteOneById(req: Request, res: Response, next: NextFunction) {
	try {
		const deleteOne = await Purchase.deleteOneById(+req.params.id);
		if (deleteOne.affectedRows === 0) return next(new NotFoundError('Purchase not found'));
		res.status(200).send({ error: false, message: 'Purchase Deleted Successfully', data: deleteOne });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Error From Delete One By Id - Purchase' });
	}
}

async function updateOneById(req: Request, res: Response, next: NextFunction) {
	try {
		await updateOnePurchaseSchema.validate(req.body, { abortEarly: false });
		const updateOne = await Purchase.updateOneById(+req.params.id, req.body);
		if (updateOne.affectedRows === 0) return next(new NotFoundError('Purchase not found'));
		res.status(200).send({ error: false, message: 'Purchase Updated Successfully', data: updateOne });
	} catch (error: any) {
		if (error.name === 'ValidationError') {
			return errorHandlerYup(error, req, res, next);
		}
		if (error.name) {
			return errorHandler(error, req, res, next);
		}
		console.log(error.message);
	}
}

async function totalPurchase(req: Request, res: Response, next: NextFunction) {
	try {
		const totalPurchase = await Purchase.totalPurchase();
		res.status(200).send({ error: false, message: 'Get Total Purchases Priced Successfully', data: totalPurchase });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Error From Total Purchase - Purchase' });
	}
}

export default {
	getAll,
	createOne,
	getOneById,
	deleteOneById,
	updateOneById,
	totalPurchase
};
