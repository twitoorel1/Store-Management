import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import CustomerBox from '../../features/customers/components/CustomerBox';
import { getAllCustomersFunction } from '../../features/customers/redux/customerSlice';
import { RootState } from '../../redux/store';

const Customers = () => {
	const dispatch = useAppDispatch();
	const { customers, isLoading, isError } = useAppSelector((state: RootState) => state.customer);

	useEffect(() => {
		dispatch(getAllCustomersFunction());
	}, [dispatch]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return <div>Error loading products</div>;
	}

	return (
		<div className="mx-auto max-w-[90%] mt-[35px]">
			<h1 className="font-semibold text-center text-[2rem] mb-5">List Customers</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-[30px]">
				{customers.map((customer: any, index: any) => (
					<CustomerBox key={index} customer={customer} allCustomers={customers} />
				))}
			</div>
		</div>
	);
};

export default Customers;
