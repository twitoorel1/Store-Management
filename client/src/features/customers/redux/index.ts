import { createSlice, Action, PayloadAction } from '@reduxjs/toolkit';
import { ICustomerState } from '@/types/customerTypes';
import { getAll, getById, updateById, deleteById, getAllCustomersPurchasedByProductId } from '../services/index';
import { createDynamicAsyncThunk } from '@/utils/redux';
import combineItemsToArray from '@/utils/combineItemsToArray';

export const getAllFunction = createDynamicAsyncThunk('customers/getAll', getAll, false);
export const getByIdFunction = createDynamicAsyncThunk('customers/getById', getById, true);
export const updateByIdFunction = createDynamicAsyncThunk('customers/updateById', updateById, true);
export const deleteByIdFunction = createDynamicAsyncThunk('customers/deleteById', deleteById, true);
export const getAllCustomersPurchasedByProductIdFunction = createDynamicAsyncThunk('customers/getAllCustomersPurchasedByProductId', getAllCustomersPurchasedByProductId, true);

const initialState: ICustomerState = {
	isLoading: false,
	isError: false,
	message: null,
	allCustomers: [],
	customersPurchases: [],
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
	reducers: {
		addCustomersPurchases: (state, action: PayloadAction<any[]>) => {
			state.customersPurchases = combineItemsToArray(state.customersPurchases, ...action.payload);
		},
		clearCustomersPurchases: state => {
			state.customersPurchases = [];
		}
	},
	extraReducers: builder => {
		builder
			// Handle get all
			.addCase(getAllFunction.pending, (state: ICustomerState) => {
				state.isLoading = true;
				state.isError = false;
			})
			.addCase(getAllFunction.fulfilled, (state: ICustomerState, { payload }) => {
				state.isLoading = false;
				state.allCustomers = payload.data;
			})

			// Handle get by id
			.addCase(getByIdFunction.pending, (state: ICustomerState) => {
				state.isLoading = true;
				state.isError = false;
			})
			.addCase(getByIdFunction.fulfilled, (state: ICustomerState, { payload }) => {
				state.isLoading = false;
				state.oneCustomer = payload.data;
			})

			// Handle update by id
			.addCase(updateByIdFunction.pending, (state: ICustomerState) => {
				state.isLoading = true;
				state.isError = false;
			})
			.addCase(updateByIdFunction.fulfilled, (state: ICustomerState, { payload }) => {
				state.isLoading = false;
				state.message = payload.message;
			})

			// Handle delete by id
			.addCase(deleteByIdFunction.pending, (state: ICustomerState) => {
				state.isLoading = true;
				state.isError = false;
			})
			.addCase(deleteByIdFunction.fulfilled, (state: ICustomerState, { payload }) => {
				state.isLoading = false;
				state.message = payload.message;
			})

			// Handle Get All Customers Purchased Product By Id Product (id product)
			.addCase(getAllCustomersPurchasedByProductIdFunction.pending, (state: ICustomerState) => {
				state.isLoading = true;
				state.isError = false;
			})
			.addCase(getAllCustomersPurchasedByProductIdFunction.fulfilled, (state: ICustomerState, { payload }) => {
				state.isLoading = false;
				state.message = payload.message;
				if (Array.isArray(payload.data)) {
					state.customersPurchases = combineItemsToArray(state.customersPurchases, ...payload.data);
				}
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

export const { addCustomersPurchases, clearCustomersPurchases } = customerSlice.actions;
export default customerSlice.reducer;
