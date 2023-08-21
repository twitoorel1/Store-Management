import { NextFunction, Request, Response } from 'express';
import { NotFoundError, UnauthorizeError } from '../errors/Errors';
import errorHandlerYup from '../errors/errorHandlerYup';
import errorHandler from '../errors/errorHandler';
import { loginRequestSchema, registerRequestSchema } from '../validators/authRequests.schema';
import User from '../models/user.models';
import bcrypt from 'bcrypt';
import { sendEmail } from '../services/sendEmail.services';
import config from 'config';

async function login(req: Request, res: Response, next: NextFunction) {
	try {
		await loginRequestSchema.validate(req.body, { abortEarly: false });
		const { username, password } = req.body;

		const user = await User.findOne(username);
		if (!user) return next(new NotFoundError('User Not Found'));
		delete user.jwt_ac_token;

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) return next(new NotFoundError('Something went wrong'));

		const accessToken = await User.login(user);
		delete user.password;

		res.status(200).json({ error: false, statusCode: 200, message: 'Login Successful', isAuthenticated: true, user, token: accessToken });
	} catch (error: any) {
		if (error.name === 'ValidationError') {
			// return res.status(400).json({ error: true, message: 'No Good Request' });
			errorHandlerYup(error, req, res, next);
		}
		if (error.name) {
			return errorHandler(error, req, res, next);
		}
		console.log(error);
	}
}

async function register(req: Request, res: Response, next: NextFunction) {
	try {
		await registerRequestSchema.validate(req.body, { abortEarly: false });
		const { username } = req.body;

		const user = await User.findOne(username);
		if (user) return next(new NotFoundError('User already exists'));

		const newUser = await User.register(req.body);

		let domainClient = config.get('domain_client');
		await sendEmail({
			from: 'twitoorel1@gmail.com',
			to: newUser.email,
			subject: 'New User Registered',
			html: `Welcome to Store Management Service For Login <a href="http://${domainClient}/auth/login">Click Here</a>`
		});

		res.status(201).send({ error: false, statusCode: 201, message: 'Register Successful', isAuthenticated: false, user: newUser });
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

async function isLogin(req: Request, res: Response, next: NextFunction) {
	try {
		const authHeader = req.headers['authorization'];
		const token = authHeader?.split(' ')[1];
		if (!token) return next(new UnauthorizeError('No token provided'));
		const user = await User.isLogin(token, next);
		delete user?.password;
		res.status(200).send({ error: false, statusCode: 200, message: 'Is Login User Successful', isAuthenticated: true, user, token: user?.jwt_ac_token });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: true, statusCode: 500, message: 'Error From IsLogin' });
	}
}

async function logout(req: Request, res: Response, next: NextFunction) {
	try {
		const { userId } = req.user;
		const authHeader = req.headers['authorization'];
		const token = authHeader?.split(' ')[1];
		if (!token && !userId) return next(new UnauthorizeError('Token And UserID not provided'));

		const user = await User.findOneById(+userId);
		if (!user) return next(new NotFoundError('User not found'));
		await User.logout(+user.id, next);
		res.status(200).send({ error: false, statusCode: 200, message: 'Logout Successful', isAuthenticated: false });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: true, statusCode: 500, message: 'Error From logout' });
	}
}

export default { login, register, isLogin, logout };
