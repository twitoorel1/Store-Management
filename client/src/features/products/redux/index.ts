import { createSlice, Action, PayloadAction } from '@reduxjs/toolkit';
import { IProductState } from '@/types/productTypes';
import { getAll, getById, updateById, deleteById, getAllProductsPurchaseByCustomerId } from '../services/index';
import { createDynamicAsyncThunk } from '@/utils/redux';
import combineItemsToArray from '@/utils/combineItemsToArray';

export const getAllFunction = createDynamicAsyncThunk('products/getAll', getAll, false);
export const getByIdFunction = createDynamicAsyncThunk('products/getById', getById, true);
export const updateByIdFunction = createDynamicAsyncThunk('products/updateById', updateById, true);
export const deleteByIdFunction = createDynamicAsyncThunk('products/deleteById', deleteById, true);
export const getAllProductsPurchaseByCustomerIdFunction = createDynamicAsyncThunk('products/getAllProductsPurchaseByCustomerId', getAllProductsPurchaseByCustomerId, true);

const initialState: IProductState = {
	isLoading: false,
	isError: false,
	message: null,
	allProducts: [],
	productsPurchases: [],
	oneProduct: {
		id: 0,
		name: '',
		price: 0,
		quantity: 0,
		created_at: '',
		updated_at: ''
	}
};

export const productSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {
		clearProductsPurchases: (state, action: PayloadAction<any[]>) => {
			state.productsPurchases = [];
		}
	},
	extraReducers: builder => {
		builder
			// Handle get all
			.addCase(getAllFunction.pending, (state: IProductState) => {
				state.isLoading = true;
				state.isError = false;
			})
			.addCase(getAllFunction.fulfilled, (state: IProductState, { payload }) => {
				state.isLoading = false;
				state.allProducts = payload.data;
			})

			// Handle get by id
			.addCase(getByIdFunction.pending, (state: IProductState) => {
				state.isLoading = true;
				state.isError = false;
			})
			.addCase(getByIdFunction.fulfilled, (state: IProductState, { payload }) => {
				state.isLoading = false;
				state.oneProduct = payload.data;
			})

			// Handle update by id
			.addCase(updateByIdFunction.pending, (state: IProductState) => {
				state.isLoading = true;
				state.isError = false;
			})
			.addCase(updateByIdFunction.fulfilled, (state: IProductState, { payload }) => {
				state.isLoading = false;
				state.message = payload.message;
			})

			// Handle delete by id
			.addCase(deleteByIdFunction.pending, (state: IProductState) => {
				state.isLoading = true;
				state.isError = false;
			})
			.addCase(deleteByIdFunction.fulfilled, (state: IProductState, { payload }) => {
				state.isLoading = false;
				state.message = payload.message;
			})

			// Handle Get All Product Purchased By Customer Id (id customer)
			.addCase(getAllProductsPurchaseByCustomerIdFunction.pending, (state: IProductState) => {
				state.isLoading = true;
				state.isError = false;
			})
			.addCase(getAllProductsPurchaseByCustomerIdFunction.fulfilled, (state: IProductState, { payload }) => {
				state.isLoading = false;
				state.message = payload.message;
				if (Array.isArray(payload.data)) {
					state.productsPurchases = combineItemsToArray(state.productsPurchases, ...payload.data);
				}
			})

			.addMatcher(
				(action: Action) => action.type.endsWith('/rejected'),
				(state: IProductState, { payload }) => {
					state.isLoading = false;
					state.isError = true;
					state.message = payload.message || 'Something Went Wrong In Product';
				}
			);
	}
});

export const { clearProductsPurchases } = productSlice.actions;
export default productSlice.reducer;
