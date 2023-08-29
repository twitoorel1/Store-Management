import { NextFunction, Request, Response } from 'express';
import Customer from '../models/customer.models';
import errorHandlerYup from '../errors/errorHandlerYup';
import errorHandler from '../errors/errorHandler';
import { NotFoundError } from '../errors/Errors';
import { createOneCustomerSchema, updateOneCustomerByIdSchema } from '../validators/validateBody.schema';

async function createOne(req: Request, res: Response, next: NextFunction) {
	try {
		await createOneCustomerSchema.validate(req.body, { abortEarly: false });
		const newCustomer = await Customer.createOne(req.body);

		res.status(201).send({ error: false, message: 'Customer Created Successfully', data: newCustomer });
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
		const customers = await Customer.getAll();
		if (customers === null) return next(new NotFoundError('Customers not found'));

		res.status(200).send({ error: false, message: 'Get All Customers Successfully', data: customers });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Error From Get All - Customer' });
	}
}

async function getOneById(req: Request, res: Response, next: NextFunction) {
	try {
		const customerById = await Customer.getOneById(+req.params.id);
		if (customerById === null) return next(new NotFoundError('Customer not found'));

		res.status(200).send({ error: false, message: 'Get One Id Customer Successfully', data: customerById });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Error From Get One By Id - Customer' });
	}
}

async function deleteOneById(req: Request, res: Response, next: NextFunction) {
	try {
		const deleteOne = await Customer.deleteOneById(+req.params.id);
		if (deleteOne.affectedRows === 0) return next(new NotFoundError('Customer not found'));

		res.status(200).send({ error: false, message: 'Customer Deleted Successfully', data: deleteOne });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Error From Delete One By Id - Customer' });
	}
}

async function updateOneById(req: Request, res: Response, next: NextFunction) {
	try {
		await updateOneCustomerByIdSchema.validate(req.body, { abortEarly: false });
		const updateOne = await Customer.updateOneById(+req.params.id, req.body);
		if (updateOne.affectedRows === 0) return next(new NotFoundError('Customer not found'));

		res.status(200).send({ error: false, message: 'Customer Updated Successfully', data: updateOne });
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

// Get All Customers Purchased Product By Id Product (id product)
// Response = customer_fullName, purchase_date
async function customersPurchase(req: Request, res: Response, next: NextFunction) {
	try {
		const totalPurchase = await Customer.customersPurchase(+req.params.productId);
		res.status(200).send({ error: false, message: 'Get All products purchased By (id product) Successfully', data: totalPurchase });
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
	customersPurchase
};
