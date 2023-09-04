import { Link } from 'react-router-dom';

const Error403 = () => {
	return (
		<div className="flex items-center justify-center flex-col w-screen h-screen">
			<h1 className="text-3xl font-bold">Error 403</h1>
			<button className="mt-4 bg-gray-300 p-4 rounded-full shadow-md">
				<Link to={'/'}>Go To HomePage</Link>
			</button>
		</div>
	);
};

export default Error403;
