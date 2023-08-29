import { api } from '@/utils/api';

export const getAll = async () => {
	try {
		const response = await api.get('/customer');
		return response.data;
	} catch (error: any) {
		return Promise.reject(error.response || error.message || 'Server Error');
	}
};

export const getById = async (id: string) => {
	try {
		const response = await api.get(`/customer/id/${id}`);
		return response.data;
	} catch (error: any) {
		return Promise.reject(error.response || error.message || 'Server Error');
	}
};

// Note: args[0] = id for params and args[1] = data for req.body
export const updateById = async (args: any) => {
	try {
		const response = await api.patch(`/customer/id/${args[0]}`, args[1]);
		return response.data;
	} catch (error: any) {
		return Promise.reject(error.response || error.message || 'Server Error');
	}
};

// Note: id = id string for params
export const deleteById = async ([id]: string) => {
	try {
		const response = await api.delete(`/customer/id/${id}`);
		return response.data;
	} catch (error: any) {
		return Promise.reject(error.response || error.message || 'Server Error');
	}
};

// Get All Customers Purchased Product By Id Product (id product)
// Response = customer_fullName, purchase_date
export const getAllCustomersPurchasedByProductId = async ([productId]: string) => {
	try {
		const response = await api.get(`/customer/listPurchase/${productId}`);
		return response.data;
	} catch (error: any) {
		return Promise.reject(error.response || error.message || 'Server Error');
	}
};
