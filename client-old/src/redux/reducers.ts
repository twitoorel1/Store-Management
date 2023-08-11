// import { combineReducers } from '@reduxjs/toolkit';
// import authReducer from '@/features/auth/redux/authSlice';

// const rootReducer = combineReducers({
// 	auth: authReducer
// });

// export type RootState = ReturnType<typeof rootReducer>;

// export default rootReducer;

import { combineReducers } from 'redux';
import authReducer from '../features/auth/redux/authSlice';

const rootReducer = combineReducers({
	auth: authReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
