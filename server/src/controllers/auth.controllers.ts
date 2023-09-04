import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import config from 'config';
import { NotFoundError, UnauthorizeError } from '../errors/Errors';
import errorHandler from '../errors/errorHandler';
import errorHandlerYup from '../errors/errorHandlerYup';
import { loginRequestSchema, registerRequestSchema } from '../validators/authRequests.schema';
import User from '../models/user.models';
import { sendEmail, ISendEmailSettings } from '../services/sendEmail.services';

async function login(req: Request, res: Response, next: NextFunction) {
	try {
		await loginRequestSchema.validate(req.body, { abortEarly: false });
		const { username, password } = req.body;

		const user = await User.findOne(username);
		if (!user) return next(new NotFoundError('User Not Found'));
		delete user.jwt_ac_token;

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) return next(new NotFoundError('something went wrong'));

		const userAccessToken = await User.login(user);
		delete user.password;
		res.status(200).json({ error: false, message: 'Login Successful', isAuthenticated: true, user, token: userAccessToken });
	} catch (error: any) {
		if (error.name === 'ValidationError') {
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
		if (user) return next(new NotFoundError('Username is already exists'));
		const newUser = await User.register(req.body);

		let emailService = config.get<ISendEmailSettings>('emailService');
		await sendEmail({
			from: emailService.auth.user,
			to: newUser.email,
			subject: 'Account Created',
			html: `Hello ${newUser.username}, your account has been created successfully. Please login to your account to continue.`
		});
		res.status(201).send({ error: false, message: 'Register Successful', isAuthenticated: false, user: newUser });
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
		res.status(200).send({ error: false, message: 'Is Login User Successful', isAuthenticated: true, user, token: user?.jwt_ac_token });
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
		res.status(200).send({ error: false, message: 'Logout Successful', isAuthenticated: false });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: true, statusCode: 500, message: 'Error From logout' });
	}
}

export default { login, register, isLogin, logout };
