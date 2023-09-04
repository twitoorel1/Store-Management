import { Request, Response, NextFunction } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
import { ServerError, UnauthorizeError } from '../errors/Errors';
import { verifyAccessToken } from '../services/jwt.services';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers['authorization'];
	if (!authHeader) return next(new UnauthorizeError('No token provided'));
	const token = authHeader.split(' ')[1];

	try {
		const decoded = verifyAccessToken(token);
		if (!decoded) throw new UnauthorizeError('Invalid token');
		req.user = decoded;
		next();
	} catch (error) {
		if (error instanceof JsonWebTokenError) {
			next(new UnauthorizeError('Invalid token'));
		} else {
			next(new ServerError('An error occurred while authenticating'));
		}
	}
};

// Middleware to role
export const authRole = (role: string) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		if (req.user.role === 'admin') {
			return next();
		}
		if (req.user.role !== role) {
			next(new UnauthorizeError('You do not have access to this route'));
		} else {
			next();
		}
	};
};
