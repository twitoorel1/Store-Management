export interface IUser {
	id: number;
	full_name: string;
	username: string;
	email: string;
	role: string;
	last_connected: string;
	created_at: string;
	updated_at: string;
}

// interface Auth State Redux
export interface IAuthState {
	// Status
	isLoading: boolean;
	isAuthenticated: boolean;
	isError: boolean;

	// From Server
	message: string | null;
	token: string | null;
	user: IUser | null;
}

export interface IFormLoginInputs {
	username: string;
	password: string;
}
