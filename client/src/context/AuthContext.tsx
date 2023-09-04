import { createContext, useContext, useEffect, useMemo } from 'react';
import { IUser } from '@/types/authTypes';
import { LayoutProps } from '@/types/global';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { getCookie } from '@/utils/cookies';
import { isLoginUser } from '@features/auth/redux';
// import { useLocation, useNavigate } from 'react-router-dom';

interface IAuthContextValue {
	isLoading: boolean;
	isError: boolean;
	isAuthenticated: boolean;
	user: IUser | null | undefined;
}

const AuthContext = createContext<IAuthContextValue | null>(null);

export function UseAuthContext() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('UseAuthContext must be used within an AuthProvider');
	}
	return context;
}

export default function AuthProvider({ children }: LayoutProps) {
	const dispatch = useAppDispatch();
	// const location = useLocation();
	// const navigate = useNavigate();
	const { isAuthenticated, isLoading, user, isError } = useAppSelector(state => state.auth);

	useEffect(() => {
		if (getCookie('token')) {
			dispatch(isLoginUser());
		}

		return () => {
			dispatch(isLoginUser());
		};
	}, []);

	// useEffect(() => {
	// 	if (isAuthenticated === false && isLoading === false && user === null) {
	// 		navigate('/auth/login', { replace: true });
	// 		return;
	// 	}
	// }, [isAuthenticated, isLoading, user, navigate]);

	useEffect(() => {}, []);

	const authContextValue = useMemo(() => ({ isAuthenticated, user, isLoading, isError }), [isAuthenticated, user, isLoading, isError]);
	return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
}
