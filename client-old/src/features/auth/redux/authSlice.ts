/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, Action } from '@reduxjs/toolkit';
import { IAuthState, IPayloadAuthState } from '../../../types/authTypes';
import { setCookie, removeCookie } from '../../../utils/cookies';
import { login, isLogin } from '../services/authService';

export const loginUser = createAsyncThunk('auth/login', async (formValue: object, { rejectWithValue }) => {
	try {
		return await login(formValue);
	} catch (error: any) {
		if (error.data) {
			return rejectWithValue(error.data);
		} else {
			console.log('object');
			return rejectWithValue(error.message);
		}
	}
});

export const isLoginByToken = createAsyncThunk('auth/isLogin', async () => {
	return await isLogin();
});

const initialState: IAuthState = {
	isLoading: false,
	isAuthenticated: false,
	isError: false,
	message: null,
	token: null,
	user: null,
	type: null
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		resetErrors: state => {
			setTimeout(() => {
				state.isError = false;
				state.message = null;
			}, 6000);
		},
		setIsLogin: state => {
			state.isAuthenticated = true;
		},
		setIsLogout: state => {
			state.isAuthenticated = false;
		}
	},
	extraReducers: builder => {
		builder
			// Handle Login
			.addCase(loginUser.pending, state => {
				state.isLoading = true;
				state.isAuthenticated = false;
				state.isError = false;
			})
			.addCase(loginUser.fulfilled, (state, { payload }: IPayloadAuthState) => {
				state.isLoading = false;
				state.isAuthenticated = true;
				state.isError = false;
				state.message = payload.message || null;
				state.token = payload.token;
				state.user = payload.user;
				setCookie('token', payload.token);
				setCookie('userId', String(payload.user?.id));
			})

			// Handle Is Login By Token
			.addCase(isLoginByToken.pending, state => {
				state.isLoading = true;
				state.isAuthenticated = false;
				state.isError = false;
			})
			.addCase(isLoginByToken.fulfilled, (state, { payload, type }: IPayloadAuthState) => {
				state.isLoading = false;
				state.isAuthenticated = true;
				state.isError = false;
				state.message = payload.message || null;
				state.user = payload.user;
				state.token = payload.token;
				state.type = type;
			})

			.addMatcher(
				(action: Action) => action.type.endsWith('/rejected'),
				(state: IAuthState, { payload }: IPayloadAuthState) => {
					state.isLoading = false;
					state.isAuthenticated = false;
					state.isError = true;
					state.message = payload.message || 'Something Went Wrong In Auth';
					state.token = null;
					state.user = null;
					removeCookie('token', { path: '/' });
					removeCookie('userId', { path: '/' });
				}
			);
	}
});

export const { setIsLogin, setIsLogout } = authSlice.actions;
export default authSlice.reducer;
