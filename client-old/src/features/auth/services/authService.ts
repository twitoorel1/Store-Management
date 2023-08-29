/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '../../../utils/api';

export const login = async (formValue: object) => {
	try {
		const response = await api.post('/auth/login', formValue);
		return response.data;
	} catch (error: any) {
		return Promise.reject(error.response || error.message || 'Server Error');
	}
};

export const isLogin = async () => {
	try {
		const response = await api.post('/auth/isLogin');
		return response.data;
	} catch (error: any) {
		return Promise.reject(error.response || error.message || 'Server Error');
	}
};
