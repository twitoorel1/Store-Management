import { NextFunction, Request, Response } from 'express';
import Product from '../models/product.models';
import errorHandlerYup from '../errors/errorHandlerYup';
import errorHandler from '../errors/errorHandler';
import { NotFoundError } from '../errors/Errors';
import { createOneProductSchema, updateOneProductByIdSchema } from '../validators/validateBody.schema';

async function createOne(req: Request, res: Response, next: NextFunction) {
	try {
		await createOneProductSchema.validate(req.body, { abortEarly: false });
		const newProduct = await Product.createOne(req.body);

		res.status(201).send({ error: false, message: 'Product Created Successfully', data: newProduct });
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
		const products = await Product.getAll();
		if (products === null) return next(new NotFoundError('Products not found'));
		res.status(200).send({ error: false, message: 'Get All Products Successfully', data: products });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Error From Get All - Product' });
	}
}

async function getOneById(req: Request, res: Response, next: NextFunction) {
	try {
		const productById = await Product.getOneById(+req.params.id);
		if (productById === null) return next(new NotFoundError('Product not found'));
		res.status(200).send({ error: false, message: `Get One Id Product: ${req.params.id} Successfully`, data: productById });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Error From Get One By Id - Product' });
	}
}

async function deleteOneById(req: Request, res: Response, next: NextFunction) {
	try {
		const deleteOne = await Product.deleteOneById(+req.params.id);
		if (deleteOne.affectedRows === 0) return next(new NotFoundError('Product not found'));
		res.status(200).send({ error: false, message: 'Product Deleted Successfully', data: deleteOne });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Error From Delete One By Id - Product' });
	}
}

async function updateOneById(req: Request, res: Response, next: NextFunction) {
	try {
		await updateOneProductByIdSchema.validate(req.body, { abortEarly: false });
		const updateOne = await Product.updateOneById(+req.params.id, req.body);
		if (updateOne.affectedRows === 0) return next(new NotFoundError('Product not found'));
		res.status(200).send({ error: false, message: 'Product Updated Successfully', data: updateOne });
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

// Get All products purchased by (id customer)
async function productsPurchase(req: Request, res: Response, next: NextFunction) {
	try {
		const listProducts = await Product.productsPurchase(+req.params.customerId);
		if (listProducts === null) return next(new NotFoundError('Products not found'));
		res.status(200).send({ error: false, message: `Get All products purchased By (id customer) = ${req.params.customerId} Successfully`, data: listProducts });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Error From Get All - Product' });
	}
}

export default {
	getAll,
	createOne,
	getOneById,
	deleteOneById,
	updateOneById,
	productsPurchase
};
