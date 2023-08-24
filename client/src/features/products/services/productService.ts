/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '../../../utils/api';
import { IEditProductInputs } from '../../../types/productTypes';

export const getTotalPurchases = async () => {
	try {
		const response = await api.get('/purchase/totalPurchase');
		return response.data;
	} catch (error: any) {
		return Promise.reject(error.response || error.message || 'Server Error');
	}
};

export const getAllProducts = async () => {
	try {
		const response = await api.get('/product');
		return response.data;
	} catch (error: any) {
		return Promise.reject(error.response || error.message || 'Server Error');
	}
};

export const getAllCustomerPurchaseByIdProduct = async (idProduct: number) => {
	try {
		const response = await api.get(`/customer/listPurchase/${idProduct}`);
		return response.data;
	} catch (error: any) {
		return Promise.reject(error.response || error.message || 'Server Error');
	}
};

export const updateOneProductById = async (idProduct: number, formValues: IEditProductInputs) => {
	try {
		const response = await api.patch(`product/id/${idProduct}`, formValues);
		return response.data;
	} catch (error: any) {
		return Promise.reject(error.response || error.message || 'Server Error');
	}
};

export const getOneProductById = async (idProduct: number) => {
	try {
		const response = await api.get(`/product/id/${idProduct}`);
		return response.data;
	} catch (error: any) {
		return Promise.reject(error.response || error.message || 'Server Error');
	}
};

export const deleteOneProductById = async (idProduct: number) => {
	try {
		const response = await api.delete(`/product/id/${idProduct}`);
		return response.data;
	} catch (error: any) {
		return Promise.reject(error.response || error.message || 'Server Error');
	}
};
