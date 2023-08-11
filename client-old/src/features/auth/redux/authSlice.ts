import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthState, FormLoginInputs, IPayloadAuthState } from '@/types/authTypes';
import { setCookie } from '../../../utils/cookies';
import { login } from '../services/auth.service';

export const loginByPayload = createAsyncThunk('auth/login', async (formValue: FormLoginInputs) => {
	const response = await login(formValue);
	return response;
});

const initialState: AuthState = {
	isAuthenticated: null,
	isLoading: false,
	isError: null,
	error: '',
	message: null,
	user: null
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		resetErrors: state => {
			setTimeout(() => {
				state.isError = false;
				state.error = '';
			}, 6000);
		},
		setIsLogin: (state, { payload }: IPayloadAuthState) => {
			state.isAuthenticated = payload.isAuthenticated;
		}
	},
	extraReducers: builder => {
		builder
			.addCase(loginByPayload.pending, state => {
				state.isLoading = true;
				state.error = '';
				state.isError = null;
			})
			.addCase(loginByPayload.fulfilled, (state, { payload }: IPayloadAuthState) => {
				state.isLoading = false;
				state.error = '';
				state.isError = false;
				state.user = payload.user;
				state.isAuthenticated = true;
				setCookie('token', payload.token);
			})
			.addCase(loginByPayload.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message!;
				state.isError = true;
			});
	}
});

export default authSlice.reducer;
