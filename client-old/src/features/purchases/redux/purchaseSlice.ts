import { createSlice, createAsyncThunk, Action } from '@reduxjs/toolkit';
import { IPurchaseState } from '../../../types/purchaseTypes';
// import { } from '../services/purchaseService';

// export const getAll = createAsyncThunk('product/getAll', async (idProduct: string | number) => {
// 	const response = await getAllCustomerPurchaseByIdProduct(idProduct);
// 	return response;
// });

const initialState: IPurchaseState = {
	isLoading: false,
	isError: false,
	message: null,
	total_purchases: null,
	products: [],
	customer_purchases: []
};

export const purchaseSlice = createSlice({
	name: 'purchase',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder;
		// handle total purchases
		// .addCase(getTotalPurchasesFunction.pending, (state: IProductState) => {
		// 	state.isLoading = true;
		// 	state.isError = false;
		// })
		// .addCase(getTotalPurchasesFunction.fulfilled, (state: IProductState, { payload }) => {
		// 	state.isLoading = false;
		// 	state.isError = false;
		// 	state.total_purchases = payload.data;
		// })

		// .addMatcher(
		// 	(action: Action) => action.type.endsWith('/rejected'),
		// 	(state: IProductState, { payload }) => {
		// 		state.isLoading = false;
		// 		state.isError = true;
		// 		state.message = payload.message || 'Something Went Wrong In Product';
		// 	}
		// );
	}
});

export default purchaseSlice.reducer;
