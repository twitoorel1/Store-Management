import { Secret } from 'jsonwebtoken';

// User Model
export enum EUserRoles {
	admin = 'admin',
	user = 'user'
}

export interface IUser {
	id: number;
	full_name: string;
	username: string;
	email: string;
	password: string;
	role: EUserRoles;

	// Statistic
	jwt_ac_token?: Secret;
	created_at?: Date | number | string | any;
	updated_at?: Date | number | string | any;

	// Functions
	comparePassword(password: string): boolean;
	setJwtTokens(accessToken: string, refreshToken: string): void;
	deleteAcToken(): void;
}

export interface IProduct {
	id: number;
	name: string;
	price: number;
	quantity: number;

	created_at?: Date | number | string | any;
	updated_at?: Date | number | string | any;
}

export interface ICustomer {
	id: number;
	first_name: string;
	last_name: string;
	city: string;

	created_at?: Date | number | string | any;
	updated_at?: Date | number | string | any;
}

export interface IPurchase {
	id: number;
	customers_id: string;
	products_id: string;
	date?: Date | number | string | any;

	updated_at?: Date | number | string | any;
}

// Global
declare module 'express' {
	interface Request {
		user?: IUser | string | object | null | undefined | any;
	}
}
