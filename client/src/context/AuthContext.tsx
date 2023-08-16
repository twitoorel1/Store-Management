import { ReactNode, createContext, useContext, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { getCookie } from '../utils/cookies';
import { isLoginByToken } from '../features/auth/redux/authSlice';
import { RootState } from '../redux/store';
// import { useLocation, useNavigate } from 'react-router-dom';

type AuthContextValue = {
	isError: boolean;
	isAuthenticated: boolean;
	isLoading: boolean;
	user: { id: number; full_name: string; username: string; email: string; role: string } | null | undefined;
};

type AuthContextProps = {
	children?: ReactNode;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function UseAuthContext() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('UseAuthContext must be used within an AuthProvider');
	}
	return context;
}

export function AuthProvider({ children }: AuthContextProps) {
	// const location = useLocation();
	// const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { isAuthenticated, isLoading, user, isError } = useAppSelector((state: RootState) => state.auth);

	useEffect(() => {
		if (getCookie('token')) {
			dispatch(isLoginByToken());
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const authContextValue = useMemo(() => ({ isAuthenticated, user, isLoading, isError }), [isAuthenticated, user, isLoading, isError]);
	return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
}
