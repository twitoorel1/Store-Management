// Auth State
export interface AuthState {
	isAuthenticated: boolean | null;
	token?: string | null;
	isLoading: boolean;
	isError: boolean | null;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	error: any;
	message: string | null;
	user?: {
		id: number;
		full_name: string;
		username: string;
		email: string;
		password: string;
		role: string;
	} | null;
}

export interface IPayloadAuthState {
	payload: {
		error: boolean;
		user: {
			id: number;
			full_name: string;
			username: string;
			email: string;
			password: string;
			role: string;
		};
		token: string;
		message: string;
		isAuthenticated: boolean;
	};
}

// Login function
export interface FormLoginInputs {
	username: string;
	password: string;
}
