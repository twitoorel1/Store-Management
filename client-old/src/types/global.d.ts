export interface RootState {
	auth: AuthState;
}

type LayoutProps = {
	children?: ReactNode;
};

export interface CustomError {
	message: string;
}
