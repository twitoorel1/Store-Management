import { createSlice, createAsyncThunk, Action } from '@reduxjs/toolkit';
import { ICustomerState, IEditCustomerInputs } from '../../../types/customerTypes';
import { getAllCustomers, getOneCustomerById, updateOneCustomerById, deleteOneCustomerById } from '../services/customerService';

export const getAllCustomersFunction = createAsyncThunk('customer/getAllCustomers', async () => {
	const response = await getAllCustomers();
	return response;
});

export const getCustomerByIdFunction = createAsyncThunk('customer/getCustomerById', async (idCustomer: number) => {
	const response = await getOneCustomerById(idCustomer);
	return response;
});

export const updateCustomerByIdFunction = createAsyncThunk('customer/updateCustomer', async ({ idCustomer, formValues }: { idCustomer: number; formValues: IEditCustomerInputs }, thunkAPI) => {
	const response = await updateOneCustomerById(idCustomer, formValues);
	return response;
});

export const deleteCustomerByIdFunction = createAsyncThunk('customer/deleteCustomer', async (idCustomer: number) => {
	const response = await deleteOneCustomerById(idCustomer);
	return response;
});

const initialState: ICustomerState = {
	isLoading: false,
	isError: false,
	message: null,
	customers: [],
	oneCustomer: {
		id: 0,
		first_name: '',
		last_name: '',
		city: '',
		created_at: '',
		updated_at: ''
	}
};

export const customerSlice = createSlice({
	name: 'customer',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			// handle get all customers
			.addCase(getAllCustomersFunction.pending, (state: ICustomerState) => {
				state.isLoading = true;
				state.isError = false;
			})
			.addCase(getAllCustomersFunction.fulfilled, (state: ICustomerState, { payload }) => {
				state.isLoading = false;
				state.isError = false;
				state.customers = payload.data;
			})

			// handle Get One customer by (id customer)
			.addCase(getCustomerByIdFunction.pending, (state: ICustomerState) => {
				state.isLoading = true;
				state.isError = false;
			})
			.addCase(getCustomerByIdFunction.fulfilled, (state: ICustomerState, { payload }) => {
				state.isLoading = false;
				state.isError = false;
				state.oneCustomer = payload.data;
			})

			// handle Update customer by (id customer)
			.addCase(updateCustomerByIdFunction.pending, (state: ICustomerState) => {
				state.isLoading = true;
				state.isError = false;
			})
			.addCase(updateCustomerByIdFunction.fulfilled, (state: ICustomerState, { payload }) => {
				state.isLoading = false;
				state.isError = false;
				state.message = payload.message;
			})

			// handle Delete customer by (id customer)
			.addCase(deleteCustomerByIdFunction.pending, (state: ICustomerState) => {
				state.isLoading = true;
				state.isError = false;
			})
			.addCase(deleteCustomerByIdFunction.fulfilled, (state: ICustomerState, { payload }) => {
				state.isLoading = false;
				state.isError = false;
				state.message = payload.message;
			})

			.addMatcher(
				(action: Action) => action.type.endsWith('/rejected'),
				(state: ICustomerState, { payload }) => {
					state.isLoading = false;
					state.isError = true;
					state.message = payload.message || 'Something Went Wrong In Customer';
				}
			);
	}
});

export default customerSlice.reducer;
