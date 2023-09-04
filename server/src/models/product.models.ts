import queryDatabase from '../database/queryDatabase';
import { RowDataPacket } from 'mysql2/promise';

const DB_NAME = 'products';

interface IProductProps {
	name: string;
	price: number;
	quantity: number;
}

/* CRUD
 * Create - createOne
 * Read - getAll, getById, productsPurchase
 * Update - updateById
 * Delete - deleteById
 */

async function createOne(body: IProductProps) {
	const query = `INSERT INTO ${DB_NAME} (name, price, quantity) VALUES (?, ?, ?);`;

	try {
		const result = await queryDatabase(query, [body.name, body.price, body.quantity]);
		return result;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

async function getAll() {
	const query = `SELECT * FROM ${DB_NAME};`;

	try {
		const result = await queryDatabase(query);
		return result;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

async function getOneById(id: number) {
	const query = `SELECT * FROM ${DB_NAME} WHERE id = ?;`;

	try {
		const result = await queryDatabase(query, [id]);
		const rows = result as RowDataPacket[];
		if (rows.length > 0) return rows[0];
		return null;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

async function deleteOneById(productId: number) {
	const query = `DELETE FROM purchases WHERE products_id = ?;`;
	const query2 = `DELETE FROM ${DB_NAME} WHERE id = ?;`;

	try {
		await queryDatabase(query, [productId]);
		const result = await queryDatabase(query2, [productId]);
		return result;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

async function updateOneById(id: number, body: IProductProps) {
	const fieldToUpdate = Object.keys(body)
		.map(key => `${key} =?`)
		.join(', ');
	const valuesToUpdate = [...Object.values(body), id];
	const query = `UPDATE ${DB_NAME} SET ${fieldToUpdate} WHERE id =?`;

	try {
		const result = await queryDatabase(query, valuesToUpdate);
		return result;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

async function productsPurchase(customerId: number) {
	const query = `SELECT products.id as product_id, customers.id as customer_id,
		products.name as product_name,
		purchases.date as purchase_date FROM purchases
		INNER JOIN customers ON purchases.customers_id = customers.id
		INNER JOIN ${DB_NAME} ON purchases.products_id = products.id
		WHERE customers.id = ? ORDER BY purchase_date DESC;`;
	try {
		const result = await queryDatabase(query, [customerId]);
		if (result.length === 0) return { error: 'Not Exist Purchases for this product' };
		// const rows = result as RowDataPacket[];
		// if (rows.length === 1) return rows[0];
		return result;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export default {
	getAll,
	getOneById,
	createOne,
	deleteOneById,
	updateOneById,
	productsPurchase
};
