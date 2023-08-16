import { Outlet } from 'react-router-dom';
import Header from './Header';
// import Footer from './Footer';

const index = () => {
	return (
		// relative w-screen h-screen
		<>
			<Header />
			<main className="flex items-center justify-center w-full h-full bg-blue-200">
				<Outlet />
			</main>
			{/* <Footer /> */}
		</>
	);
};

export default index;
