import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const LayoutMain = () => {
	return (
		<>
			<Header />
			<main>
				<Outlet />
			</main>
			<Footer />
		</>
	);
};

export default LayoutMain;
