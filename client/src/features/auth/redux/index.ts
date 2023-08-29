import { createSlice, Action } from '@reduxjs/toolkit';
import { IAuthState } from '@/types/authTypes';
import { login, isLogin, logout } from '../services';
import { setCookie, removeCookie } from '@/utils/cookies';
import { createDynamicAsyncThunk } from '@/utils/redux';

export const loginUser = createDynamicAsyncThunk('auth/login', login, true);
export const isLoginUser = createDynamicAsyncThunk('auth/isLogin', isLogin, false);
export const logoutUser = createDynamicAsyncThunk('auth/logout', logout, false);

const initialState: IAuthState = {
	isLoading: false,
	isAuthenticated: false,
	isError: false,
	message: null,
	token: null,
	user: null
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			// Handle Login User
			.addCase(loginUser.pending, (state: IAuthState) => {
				state.isLoading = true;
				state.isError = false;
			})
			.addCase(loginUser.fulfilled, (state: IAuthState, { payload }) => {
				state.isLoading = false;
				state.isAuthenticated = true;
				state.message = payload.message;
				state.token = payload.token;
				state.user = payload.user;
				setCookie('token', payload.token);
			})

			// Handle Is Login User
			.addCase(isLoginUser.pending, (state: IAuthState) => {
				state.isLoading = true;
				state.isError = false;
			})
			.addCase(isLoginUser.fulfilled, (state: IAuthState, { payload }) => {
				state.isLoading = false;
				state.isAuthenticated = true;
				state.message = payload.message;
				state.token = payload.token;
				state.user = payload.user;
			})

			// Handle Logout User
			.addCase(logoutUser.pending, (state: IAuthState) => {
				state.isLoading = true;
				state.isError = false;
			})
			.addCase(logoutUser.fulfilled, (state: IAuthState, { payload }) => {
				state.isLoading = false;
				state.isAuthenticated = false;
				state.message = payload.message;
				state.token = null;
				state.user = null;
				removeCookie('token', { path: '/' });
			})

			.addMatcher(
				(action: Action) => action.type.endsWith('/rejected'),
				(state: IAuthState, { payload }) => {
					state.isLoading = false;
					state.isAuthenticated = false;
					state.token = null;
					state.isError = true;
					state.message = payload.message || 'Something Went Wrong In Auth';
				}
			);
	}
});

export default authSlice.reducer;
