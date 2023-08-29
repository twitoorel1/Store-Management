import { api } from '@/utils/api';

export const login = async ([formValue]: any) => {
	try {
		const response = await api.post('/auth/login', formValue);
		console.log(response);
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

export const logout = async () => {
	try {
		const response = await api.post('/auth/logout');
		return response.data;
	} catch (error: any) {
		return Promise.reject(error.response || error.message || 'Server Error');
	}
};
