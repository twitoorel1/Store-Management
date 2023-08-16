/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, Action } from '@reduxjs/toolkit';
import { IAuthState, IPayloadAuthState } from '../../types/authTypes';
import { setCookie } from '../../utils/cookies';
const backendURL = 'http://localhost:4000';
import axios from 'axios';

export const loginUser = createAsyncThunk('auth/login', async (values: object, { rejectWithValue }) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};
		const res = await axios.post(`${backendURL}/auth/login`, values, config);
		return res.data;
	} catch (error: any) {
		if (error.response) {
			return rejectWithValue(error.response.data);
		} else {
			console.log('Here 2');
			return rejectWithValue(error.message);
		}
	}
});

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
	reducers: {
		resetErrors: state => {
			setTimeout(() => {
				state.isError = false;
				state.message = null;
			}, 6000);
		},
		setIsLogin: (state, { payload }: IPayloadAuthState) => {
			state.isAuthenticated = payload.isAuthenticated;
		}
	},
	extraReducers: builder => {
		// Login
		builder
			.addCase(loginUser.pending, state => {
				state.isLoading = true;
				state.isError = false;
			})
			.addCase(loginUser.fulfilled, (state, { payload }: IPayloadAuthState) => {
				state.isLoading = false;
				state.isAuthenticated = true;
				state.isError = false;
				state.message = 'Login Success';
				state.token = payload.token;
				state.user = payload.user;
				setCookie('token', payload.token);
				setCookie('userId', String(payload.user.id));
				console.log(payload);
			})
			.addMatcher(
				(action: Action) => action.type.endsWith('/rejected'),
				(state: IAuthState, { payload }: IPayloadAuthState) => {
					state.isLoading = false;
					state.isAuthenticated = false;
					state.isError = true;
					state.message = payload.message;
					state.token = null;
					state.user = null;
					console.log(payload);
				}
			);
	}
});

export default authSlice.reducer;
