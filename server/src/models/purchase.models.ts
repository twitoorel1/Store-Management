import queryDatabase from '../database/queryDatabase';
import { RowDataPacket } from 'mysql2/promise';
import { generateRandomNumbers } from '../utils/randomNumbers';

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

/* Mission 2-Area-2 - Add Button */
async function createOne(body: IPurchaseProps) {
	const randomId = await generateRandomNumbers(5);
	const query = `SELECT quantity FROM products WHERE id = ?;`;
	const query2 = `INSERT INTO ${DB_NAME} (id, customers_id, products_id) VALUES (?, ?, ?);`;
	const query3 = `UPDATE products SET quantity = quantity - 1 WHERE id = ?;`;

	try {
		const resultStock = await queryDatabase(query, [body.products_id]);
		if (resultStock[0].quantity === 0) return { error: 'Not enough products in stock' };
		await Promise.all([queryDatabase(query2, [randomId, body.customers_id, body.products_id]), queryDatabase(query3, [body.products_id])]);
		return true;
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

/* Mission 2-Area-1 */
async function totalPurchase() {
	const query = `SELECT COUNT(*) as total FROM ${DB_NAME};`;

	try {
		const result = await queryDatabase(query);
		return result[0].total;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

const PurchaseModel = {
	getAll,
	getOneById,
	createOne,
	deleteOneById,
	updateOneById,
	totalPurchase
};
export default PurchaseModel;
