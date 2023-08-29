import { createSlice, Action } from '@reduxjs/toolkit';
import { IPurchaseState } from '@/types/purchaseTypes';
import { createOne, getAll, getById, updateById, deleteById, getTotalPurchases } from '../services/index';
import { createDynamicAsyncThunk } from '@/utils/redux';

export const createOneFunction = createDynamicAsyncThunk('purchase/createOne', createOne, true);
export const getAllFunction = createDynamicAsyncThunk('purchase/getAll', getAll, false);
export const getByIdFunction = createDynamicAsyncThunk('purchase/getById', getById, true);
export const updateByIdFunction = createDynamicAsyncThunk('purchase/updateById', updateById, true);
export const deleteByIdFunction = createDynamicAsyncThunk('purchase/deleteById', deleteById, true);
export const getTotalPurchasesFunction = createDynamicAsyncThunk('purchase/getTotalPurchases', getTotalPurchases, true);

const initialState: IPurchaseState = {
	isLoading: false,
	isError: false,
	message: null,
	total_purchases: null,
	allPurchases: [],
	onePurchase: {
		id: 0,
		customers_id: 0,
		products_id: 0,
		date: '',
		updated_at: ''
	}
};

export const purchaseSlice = createSlice({
	name: 'purchase',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			// Handle create One
			.addCase(createOneFunction.pending, (state: IPurchaseState) => {
				state.isLoading = true;
				state.isError = false;
			})
			.addCase(createOneFunction.fulfilled, (state: IPurchaseState, { payload }) => {
				state.isLoading = false;
				state.message = payload.message;
			})

			// Handle get all
			.addCase(getAllFunction.pending, (state: IPurchaseState) => {
				state.isLoading = true;
				state.isError = false;
			})
			.addCase(getAllFunction.fulfilled, (state: IPurchaseState, { payload }) => {
				state.isLoading = false;
				state.allPurchases = payload.data;
			})

			// Handle get by id
			.addCase(getByIdFunction.pending, (state: IPurchaseState) => {
				state.isLoading = true;
				state.isError = false;
			})
			.addCase(getByIdFunction.fulfilled, (state: IPurchaseState, { payload }) => {
				state.isLoading = false;
				state.onePurchase = payload.data;
			})

			// Handle update by id
			.addCase(updateByIdFunction.pending, (state: IPurchaseState) => {
				state.isLoading = true;
				state.isError = false;
			})
			.addCase(updateByIdFunction.fulfilled, (state: IPurchaseState, { payload }) => {
				state.isLoading = false;
				state.message = payload.message;
			})

			// Handle delete by id
			.addCase(deleteByIdFunction.pending, (state: IPurchaseState) => {
				state.isLoading = true;
				state.isError = false;
			})
			.addCase(deleteByIdFunction.fulfilled, (state: IPurchaseState, { payload }) => {
				state.isLoading = false;
				state.message = payload.message;
			})

			// Handle Get All Product Purchased By Customer Id (id customer)
			.addCase(getTotalPurchasesFunction.pending, (state: IPurchaseState) => {
				state.isLoading = true;
				state.isError = false;
			})
			.addCase(getTotalPurchasesFunction.fulfilled, (state: IPurchaseState, { payload }) => {
				state.isLoading = false;
				state.message = payload.message;
				state.total_purchases = payload.data;
			})

			.addMatcher(
				(action: Action) => action.type.endsWith('/rejected'),
				(state: IPurchaseState, { payload }) => {
					state.isLoading = false;
					state.isError = true;
					state.message = payload.message || 'Something Went Wrong In Product';
				}
			);
	}
});

export default purchaseSlice.reducer;
