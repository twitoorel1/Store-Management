// import { Link } from 'react-router-dom';

import { Link } from 'react-router-dom';

const Home = () => {
	return (
		<div className="container">
			<h1 className="text-4xl font-bold text-center">Welcome to Store Management</h1>
			<Link to="/asvd">Here</Link>
		</div>
		// <div className="flex flex-col items-center justify-center">
		// 	<h1 className="text-4xl font-bold text-center">Welcome to Store Management</h1>
		// 	<div className="flex items-center justify-center mt-7">
		// 		<button className="p-3 mr-4 bg-blue-200 rounded-full shadow-md">
		// 			<Link to="/products">Products</Link>
		// 		</button>
		// 		<button className="p-3 bg-blue-200 rounded-full shadow-md">
		// 			<Link to="/customers">Customers</Link>
		// 		</button>
		// 		<button className="p-3 ml-4 bg-blue-200 rounded-full shadow-md">
		// 			<Link to="/purchases">Purchases</Link>
		// 		</button>
		// 	</div>
		// </div>
	);
};

export default Home;
