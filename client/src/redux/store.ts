import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/redux/authSlice';
import productReducer from '../features/products/redux/productSlice';
import customerReducer from '../features/customers/redux/customerSlice';
import purchaseReducer from '../features/purchases/redux/purchaseSlice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		product: productReducer,
		customer: customerReducer,
		purchase: purchaseReducer
	}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
