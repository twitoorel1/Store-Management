import { Link } from 'react-router-dom';

const CustomerBox = () => {
	return (
		<div className="rounded-md shadow-md bg-blue-100 py-5">
			<div className="rounded-md bg-gray-100 p-2.5 mx-auto w-4/5">
				<h1 className="text-base font-light text-center">
					<Link to={'/'}>Orel Twito</Link>
				</h1>
			</div>
		</div>
	);
};

export default CustomerBox;
