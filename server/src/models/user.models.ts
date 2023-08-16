import { NextFunction } from 'express';
import queryDatabase from '../database/queryDatabase';
import { RowDataPacket } from 'mysql2/promise';
import bcrypt from 'bcrypt';
import { JwtPayload } from 'jsonwebtoken';
import { createAccessToken, verifyAccessToken } from '../services/jwt.services';
import { UnauthorizeError } from '../errors/Errors';
import { IUser } from '../types/global';

const DB_NAME = 'users';

// interface IUserProps {
// 	full_name: 'string';
// 	username: 'string';
// 	email: 'string';
// 	password: 'string';
// }

async function findOneById(id: number) {
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

async function findOne(username: string) {
	const query = `SELECT * FROM ${DB_NAME} WHERE username = ?;`;
	try {
		const result = await queryDatabase(query, [username]);
		const rows = result as RowDataPacket[];
		if (rows.length > 0) return rows[0];
		return null;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

async function login(user: any) {
	const currentDateTime = new Date();
	const query = `UPDATE ${DB_NAME} SET jwt_ac_token = ?, last_connected = ? WHERE id = ?`;

	try {
		const accessToken = createAccessToken(user.id.toString(), user.role);
		await queryDatabase(query, [accessToken, currentDateTime, user.id]);
		return accessToken;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

async function register(body: IUser) {
	const query = `INSERT INTO ${DB_NAME} (full_name, username, email, password) VALUES (?, ?, ?, ?);`;

	try {
		const hashedPassword = await bcrypt.hash(body.password, 10);
		console.log(hashedPassword);
		return await queryDatabase(query, [body.full_name, body.username, body.email, hashedPassword]);
	} catch (error) {
		console.log(error);
		throw error;
	}
}

async function isLogin(token: string, next: NextFunction) {
	try {
		const { userId } = verifyAccessToken(token) as JwtPayload;
		if (!userId) return next(new UnauthorizeError('Invalid Token'));
		const user = await findOneById(+userId);
		return user;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

async function logout(id: number, next: NextFunction) {
	const query = `UPDATE ${DB_NAME} SET jwt_ac_token = NULL WHERE id = ?;`;

	try {
		await queryDatabase(query, [id]);
		return next();
	} catch (error) {
		console.log(error);
		throw error;
	}
}

const userModel = {
	findOne,
	findOneById,
	login,
	register,
	isLogin,
	logout
};
export default userModel;
