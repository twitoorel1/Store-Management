// import { configureStore } from '@reduxjs/toolkit';
// import authReducer from '../features/auth/redux/authSlice';

// const store = configureStore({
// 	reducer: {
// 		auth: authReducer
// 	}
// });

// export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof store.getState>;

// export default store;

import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

const store = configureStore({
	reducer: rootReducer
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
