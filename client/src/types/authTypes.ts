// interface Auth State Redux
export interface IAuthState {
	// Status
	isLoading: boolean;
	isAuthenticated: boolean;
	isError: boolean;
	type: string | null;

	// From Server
	message: string | null;
	token: string | null;
	user?: {
		id: number;
		full_name: string;
		username: string;
		email: string;
		role: string;
	} | null;
}

// Payload From Server
export interface IPayloadAuthState {
	type: string;
	payload: {
		error: boolean;
		statusCode: number;
		message: string | null;
		isAuthenticated: boolean;
		user?: {
			id: number;
			full_name: string;
			username: string;
			email: string;
			role: string;
			last_connected: string;
			created_at: string;
			updated_at: string;
		} | null;
		token: string;
	};
}

export type FormLoginInputs = {
	username: string;
	password: string;
};
