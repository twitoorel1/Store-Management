import { useEffect } from 'react';
import { getAllFunction } from '@features/customers/redux';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';

import CustomerBox from '@features/customers/components/CustomerBox';

const Customer = () => {
	const dispatch = useAppDispatch();
	const { allCustomers } = useAppSelector(state => state.customer);

	useEffect(() => {
		dispatch(getAllFunction());
	}, [dispatch]);

	return (
		<div className="mx-auto max-w-[90%] mt-[35px]">
			<h1 className="font-semibold text-center text-[2rem] mb-5">List Customers</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-[30px]">
				{allCustomers.map((customer: any, index: any) => (
					<CustomerBox key={index} customer={customer} allCustomers={allCustomers} />
				))}
			</div>
		</div>
	);
};

export default Customer;
