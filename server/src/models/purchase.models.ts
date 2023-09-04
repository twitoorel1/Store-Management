import queryDatabase from '../database/queryDatabase';
import { RowDataPacket } from 'mysql2/promise';

const DB_NAME = 'purchases';

interface IPurchaseProps {
	customers_id: number;
	products_id: number;
	date?: Date | number | string | any;
}

/* CRUD
 * Create - createOne
 * Read - getAll, getById, totalPurchase
 * Update - updateById
 * Delete - deleteById
 */

async function createOne(body: IPurchaseProps) {
	const query = `SELECT quantity FROM products WHERE id = ?;`;
	const query2 = `INSERT INTO ${DB_NAME} (customers_id, products_id) VALUES (?, ?);`;
	const query3 = `UPDATE products SET quantity = quantity - 1 WHERE id = ?;`;

	try {
		const resultStock = await queryDatabase(query, [body.products_id]);
		if (resultStock[0].quantity <= 0) return 'Not enough products in stock';
		await Promise.all([queryDatabase(query2, [body.customers_id, body.products_id]), queryDatabase(query3, [body.products_id])]);
		return 'Purchase Created Successfully';
	} catch (error) {
		console.log(error);
		throw error;
	}
}

async function getAll() {
	const query = `SELECT * FROM ${DB_NAME};`;

	try {
		const result = await queryDatabase(query);
		if (result.length === 0) return { error: 'Not Exist Purchases for this product' };
		const rows = result as RowDataPacket[];
		if (rows.length === 1) return rows[0];
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

async function deleteOneById(id: number) {
	const query = `DELETE FROM ${DB_NAME} WHERE id = ?;`;

	try {
		const result = await queryDatabase(query, [id]);
		return result;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

async function updateOneById(id: number, body: IPurchaseProps) {
	const fieldToUpdate = Object.keys(body)
		.map(key => `${key} =?`)
		.join(', ');
	const valuesToUpdate = [...Object.values(body), id];
	const query = `UPDATE ${DB_NAME} SET ${fieldToUpdate} WHERE id = ?`;

	try {
		const result = await queryDatabase(query, valuesToUpdate);
		return result;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

async function totalPurchase() {
	// const query = `SELECT COUNT(*) as total FROM ${DB_NAME};`; /* Summary of total orders number */
	const query = `SELECT SUM(price) as total_purchases FROM purchases INNER JOIN products ON purchases.products_id = products.id`; /* Summary of total orders price */

	try {
		const result = await queryDatabase(query);
		return result[0].total_purchases;
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
	totalPurchase
};
