import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from './Header';

import useLoader from '@/hooks/useLoader.tsx';
import Loader from '@/components/common/Loader.tsx';
import { useAppSelector } from '@/hooks/useRedux';

const index = () => {
	const isLoading = useLoader(2000);
	const navigate = useNavigate();

	const { isAuthenticated, user } = useAppSelector(state => state.auth);

	useEffect(() => {
		if (isAuthenticated && user) {
			navigate('/', { replace: true });
		}
	}, [navigate, isAuthenticated, user]);

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<>
					<Header />
					<main>
						<Outlet />
					</main>
				</>
			)}
		</>
	);
};

export default index;
