import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const index = () => {
	return (
		// relative w-screen h-screen
		<>
			<Header />
			<main className="mb-5">
				<Outlet />
			</main>
			<Footer />
		</>
	);
};

export default index;
