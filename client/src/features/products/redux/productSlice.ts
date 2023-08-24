import { createSlice, createAsyncThunk, Action } from '@reduxjs/toolkit';
import { IEditProductInputs, IProductState } from '../../../types/productTypes';
import { getTotalPurchases, getAllProducts, getOneProductById, deleteOneProductById, getAllCustomerPurchaseByIdProduct, updateOneProductById } from '../services/productService';

export const getTotalPurchasesFunction = createAsyncThunk('product/totalPurchases', async () => {
	const response = await getTotalPurchases();
	return response;
});

export const getAllProductsFunction = createAsyncThunk('product/getAllProducts', async () => {
	const response = await getAllProducts();
	return response;
});

export const getAllCustomerPurchaseByIdProductsFunction = createAsyncThunk('product/getAll', async (idProduct: number) => {
	const response = await getAllCustomerPurchaseByIdProduct(idProduct);
	return response;
});

export const getProductById = createAsyncThunk('product/getProductById', async (idProduct: number) => {
	const response = await getOneProductById(idProduct);
	return response;
});

export const updateProductById = createAsyncThunk('product/updateProduct', async ({ idProduct, formValues }: { idProduct: number; formValues: IEditProductInputs }, thunkAPI) => {
	const response = await updateOneProductById(idProduct, formValues);
	return response;
});

export const deleteProductById = createAsyncThunk('product/deleteProduct', async (idProduct: number) => {
	const response = await deleteOneProductById(idProduct);
	return response;
});

const initialState: IProductState = {
	isLoading: false,
	isError: false,
	products: [],
	customer_purchases: [],
	message: null,
	total_purchases: null,
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
	reducers: {},
	extraReducers: builder => {
		builder
			// handle total purchases
			.addCase(getTotalPurchasesFunction.pending, (state: IProductState) => {
				state.isLoading = true;
				state.isError = false;
			})
			.addCase(getTotalPurchasesFunction.fulfilled, (state: IProductState, { payload }) => {
				state.isLoading = false;
				state.isError = false;
				state.total_purchases = payload.data;
			})

			// handle get all products
			.addCase(getAllProductsFunction.pending, (state: IProductState) => {
				state.isLoading = true;
				state.isError = false;
			})
			.addCase(getAllProductsFunction.fulfilled, (state: IProductState, { payload }) => {
				state.isLoading = false;
				state.isError = false;
				state.products = payload.data;
			})

			// handle Get All products purchased by (id product)
			.addCase(getAllCustomerPurchaseByIdProductsFunction.pending, (state: IProductState) => {
				state.isLoading = true;
				state.isError = false;
			})
			.addCase(getAllCustomerPurchaseByIdProductsFunction.fulfilled, (state: IProductState, { payload }) => {
				state.isLoading = false;
				state.isError = false;
				state.message = payload.message;
			})

			// handle Get One Product by (id product)
			.addCase(getProductById.pending, (state: IProductState) => {
				state.isLoading = true;
				state.isError = false;
			})
			.addCase(getProductById.fulfilled, (state: IProductState, { payload }) => {
				state.isLoading = false;
				state.isError = false;
				state.message = payload.message;
				state.oneProduct = payload.data;
			})

			// handle Update product by (id product)
			.addCase(updateProductById.pending, (state: IProductState) => {
				state.isLoading = true;
				state.isError = false;
			})
			.addCase(updateProductById.fulfilled, (state: IProductState, { payload }) => {
				state.isLoading = false;
				state.isError = false;
				state.message = payload.message;
			})

			// handle Delete product by (id product)
			.addCase(deleteProductById.pending, (state: IProductState) => {
				state.isLoading = true;
				state.isError = false;
			})
			.addCase(deleteProductById.fulfilled, (state: IProductState, { payload }) => {
				state.isLoading = false;
				state.isError = false;
				state.message = payload.message;
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

export default productSlice.reducer;

// handle get All Customer Purchase By Id Product
// .addCase(getAllCustomerPurchaseByIdProductsFunction.pending, (state: IProductState) => {
// 	state.isLoading = true;
// 	state.isError = false;
// })
// .addCase(getAllCustomerPurchaseByIdProductsFunction.fulfilled, (state: IProductState, { payload }) => {
// 	state.isLoading = false;
// 	state.isError = false;
// 	state.customer_purchases = payload;
// 	console.log(payload);
// })
