import { api } from '@/utils/api';

export const createOne = async ([data]: any) => {
	try {
		const response = await api.post('/purchase', data);
		return response.data;
	} catch (error: any) {
		return Promise.reject(error.response || error.message || 'Server Error');
	}
};

export const getAll = async () => {
	try {
		const response = await api.get('/purchase');
		return response.data;
	} catch (error: any) {
		return Promise.reject(error.response || error.message || 'Server Error');
	}
};

export const getById = async (id: string) => {
	try {
		const response = await api.get(`/purchase/id/${id}`);
		return response.data;
	} catch (error: any) {
		return Promise.reject(error.response || error.message || 'Server Error');
	}
};

export const updateById = async (args: any) => {
	try {
		const response = await api.patch(`/purchase/id/${args[0]}`, args[1]);
		return response.data;
	} catch (error: any) {
		return Promise.reject(error.response || error.message || 'Server Error');
	}
};

export const deleteById = async ([id]: string) => {
	try {
		const response = await api.delete(`/purchase/id/${id}`);
		return response.data;
	} catch (error: any) {
		return Promise.reject(error.response || error.message || 'Server Error');
	}
};

export const getTotalPurchases = async () => {
	try {
		const response = await api.get('/purchase/totalPurchase');
		return response.data;
	} catch (error: any) {
		return Promise.reject(error.response || error.message || 'Server Error');
	}
};
