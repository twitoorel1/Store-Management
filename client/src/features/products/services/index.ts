import { api } from '@/utils/api';

export const getAll = async () => {
	try {
		const response = await api.get('/product');
		return response.data;
	} catch (error: any) {
		return Promise.reject(error.response || error.message || 'Server Error');
	}
};

export const getById = async (id: string) => {
	try {
		const response = await api.get(`/product/id/${id}`);
		return response.data;
	} catch (error: any) {
		return Promise.reject(error.response || error.message || 'Server Error');
	}
};

export const updateById = async (args: any) => {
	try {
		const response = await api.patch(`/product/id/${args[0]}`, args[1]);
		return response.data;
	} catch (error: any) {
		return Promise.reject(error.response || error.message || 'Server Error');
	}
};

export const deleteById = async ([id]: string) => {
	try {
		const response = await api.delete(`/product/id/${id}`);
		return response.data;
	} catch (error: any) {
		return Promise.reject(error.response || error.message || 'Server Error');
	}
};

// Get All Product Purchased By Customer Id (id customer)
// Response = product_name, purchase_date
export const getAllProductsPurchaseByCustomerId = async ([customerId]: string) => {
	try {
		const response = await api.get(`/product/listPurchase/${customerId}`);
		return response.data;
	} catch (error: any) {
		return Promise.reject(error.response || error.message || 'Server Error');
	}
};
