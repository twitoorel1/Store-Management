import { Link } from 'react-router-dom';
import CustomerBox from '../../components/CustomerBox';

const Customers = () => {
	return (
		<div className="mx-auto max-w-[90%] mt-[35px]">
			<h1 className="font-semibold text-center text-[2rem] mb-5">List Customers</h1>
			<div className="grid grid-cols-1 gap-[30px] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl: 2xl:grid-cols-5">
				<CustomerBox />
			</div>
		</div>
	);
};

export default Customers;
