import { Outlet } from 'react-router-dom';
import Header from './Header';

const LayoutAuth = () => {
	return (
		<>
			<Header />
			<main>
				<Outlet />
			</main>
		</>
	);
};

export default LayoutAuth;
