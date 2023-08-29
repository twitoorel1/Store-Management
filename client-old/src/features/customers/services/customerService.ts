/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '../../../utils/api';
import { IEditCustomerInputs } from '../../../types/customerTypes';

export const getAllCustomers = async () => {
	try {
		const response = await api.get('/customer');
		return response.data;
	} catch (error: any) {
		return Promise.reject(error.response || error.message || 'Server Error');
	}
};

export const getOneCustomerById = async (idCustomer: number) => {
	try {
		const response = await api.get(`/customer/id/${idCustomer}`);
		return response.data;
	} catch (error: any) {
		return Promise.reject(error.response || error.message || 'Server Error');
	}
};

export const updateOneCustomerById = async (idCustomer: number, formValues: IEditCustomerInputs) => {
	try {
		const response = await api.patch(`/customer/id/${idCustomer}`, formValues);
		return response.data;
	} catch (error: any) {
		return Promise.reject(error.response || error.message || 'Server Error');
	}
};

export const deleteOneCustomerById = async (idCustomer: number) => {
	try {
		const response = await api.delete(`/customer/id/${idCustomer}`);
		return response.data;
	} catch (error: any) {
		return Promise.reject(error.response || error.message || 'Server Error');
	}
};
