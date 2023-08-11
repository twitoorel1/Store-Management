import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthState, FormLoginInputs, IPayloadAuthState } from '@/types/authTypes';
import { setCookie } from '../../../utils/cookies';
import { login } from '../services/auth.service';

export const loginByPayload = createAsyncThunk('auth/login', async (values: FormLoginInputs) => {
	const data = await login(values);

	return data;
});

// לבנות את זה מהתחלה כולל types

const initialState: AuthState = {
	isAuthenticated: null,
	isLoading: false,
	isError: null,
	error: '',
	user: null,
	message: null
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
		// Handle Login
		builder
			.addCase(loginByPayload.pending, (state: AuthState) => {
				state.isLoading = true;
				state.isError = false;
				state.error = '';
				state.message = null;
				state.user = null;
			})
			.addCase(loginByPayload.fulfilled, (state: AuthState, { payload }: IPayloadAuthState) => {
				state.isLoading = false;
				state.isError = payload.error;
				state.error = '';
				state.message = payload.message;
				state.user = payload.user;
				state.isAuthenticated = payload.isAuthenticated;
				setCookie('token', payload.token);
				setCookie('userId', payload.user.id.toString());
			})
			.addCase(loginByPayload.rejected, (state: AuthState) => {
				state.isLoading = false;
				state.isError = true;
				state.error = 'Error';
				state.message = 'Error Message';
				state.isAuthenticated = false;
				console.log(Error);
			});
		// .addMatcher(
		// 	(action: Action) => action.type.endsWith('/rejected'),
		// 	(state: AuthState, { payload }: IPayloadAuthState) => {
		// 		state.isLoading = false;
		// 		state.isError = true;
		// 		state.error = 'Error';
		// 		state.isAuthenticated = false;
		// 		console.log(Error);
		// 	}
		// );
	}
});

export default authSlice.reducer;
