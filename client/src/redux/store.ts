import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@features/auth/redux';
import productReducer from '@features/products/redux';
import customerReducer from '@features/customers/redux';
import purchaseReducer from '@features/purchases/redux';

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
