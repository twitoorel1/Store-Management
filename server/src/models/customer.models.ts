import queryDatabase from '../database/queryDatabase';
import { RowDataPacket } from 'mysql2/promise';
// import { generateRandomNumbers } from '../utils/randomNumbers';
// const randomId = await generateRandomNumbers(4);

const DB_NAME = 'customers';

interface ICustomerProps {
	first_name: string;
	last_name: string;
	city: string;
}

/* CRUD
 * Create - createOne
 * Read - getAll, getById
 * Update - updateById
 * Delete - deleteById
 */

async function createOne(body: ICustomerProps) {
	const query = `INSERT INTO ${DB_NAME} (first_name, last_name, city) VALUES (?, ?, ?);`;

	try {
		const result = await queryDatabase(query, [body.first_name, body.last_name, body.city]);
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

/* Mission 4-Area-1 */
async function deleteOneById(customerId: number) {
	const query = `DELETE FROM purchases WHERE customers_id = ?;`;
	const query2 = `DELETE FROM ${DB_NAME} WHERE id = ?;`;

	try {
		await queryDatabase(query, [customerId]);
		const result = await queryDatabase(query2, [customerId]);
		return result;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

async function updateOneById(id: number, body: ICustomerProps) {
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

/* Mission 2-Area-2 & Mission 3-Area-2 */
async function customersPurchase(productId: number) {
	const query = `SELECT products.id as product_id, customers.id as customer_id,
		concat(customers.first_name, ' ', customers.last_name) as customer_fullName,
		purchases.date as purchase_date FROM purchases
		INNER JOIN customers ON purchases.customers_id = customers.id
		INNER JOIN products ON purchases.products_id = products.id
		WHERE products.id = ? ORDER BY purchase_date DESC;`;
	try {
		const result = await queryDatabase(query, [productId]);
		if (result.length === 0) return { error: 'Not Exist Purchases for this product' };

		// const rows = result as RowDataPacket[];
		// if (rows.length === 1) return rows[0];
		return result;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

const CustomerModel = {
	getAll,
	getOneById,
	createOne,
	deleteOneById,
	updateOneById,
	customersPurchase
};
export default CustomerModel;
