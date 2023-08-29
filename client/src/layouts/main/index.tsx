import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

import useLoader from '@/hooks/useLoader.tsx';
import Loader from '@/components/common/Loader.tsx';

const index = () => {
	const isLoading = useLoader(2000);

	return (
		<>
			<Header />
			<main className="mb-24">
				<Outlet />
			</main>
			<Footer />
		</>
	);

	// return (
	// 	<>
	// 		{isLoading ? (
	// 			<Loader />
	// 		) : (
	// 			<>
	// 				<Header />
	// 				<main className="mb-24">
	// 					<Outlet />
	// 				</main>
	// 				<Footer />
	// 			</>
	// 		)}
	// 	</>
	// );
};

export default index;
