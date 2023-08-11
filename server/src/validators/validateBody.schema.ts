import * as yup from 'yup';

// Product Model
export const createOneProductSchema = yup.object().shape({
	name: yup.string().required('name is required'),
	price: yup.number().required('price is required').min(100, 'price must be greater than 100'),
	quantity: yup.string().required('quantity is required').min(1, 'quantity must be greater than 1')
});

export const updateOneProductByIdSchema = yup.object().shape({
	name: yup.string(),
	price: yup.number().min(100, 'price must be greater than 100'),
	quantity: yup.string()
});

// Customer Model
export const createOneCustomerSchema = yup.object().shape({
	first_name: yup.string().required('first name is required'),
	last_name: yup.string().required('last name is required'),
	city: yup.string().required('city is required')
});

export const updateOneCustomerByIdSchema = yup.object().shape({
	first_name: yup.string(),
	last_name: yup.string(),
	city: yup.string()
});

// Purchase Model
export const createOnePurchaseSchema = yup.object().shape({
	customers_id: yup.number().required('customer id is required'),
	products_id: yup.number().required('product id is required'),
	date: yup.string()
});

export const updateOnePurchaseSchema = yup.object().shape({
	customers_id: yup.number().required('customer id is required'),
	products_id: yup.number().required('product id is required'),
	date: yup.string()
});
