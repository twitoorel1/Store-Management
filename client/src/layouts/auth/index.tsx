import { Outlet } from 'react-router-dom';
import Header from './Header';

const index = () => {
	return (
		<>
			<Header />
			<main>
				<Outlet />
			</main>
		</>
	);
};

export default index;
