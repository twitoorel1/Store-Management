import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProductBox from '../../components/customerPage/ProductBox';
import UpdateForm from '../../features/customers/components/UpdateForm';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { RootState } from '../../redux/store';
import { getCustomerByIdFunction, deleteCustomerByIdFunction } from '../../features/customers/redux/customerSlice';

const EditCustomer = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [OpenDelete, setOpenDelete] = useState(false);

	const { oneCustomer, isLoading, isError } = useAppSelector((state: RootState) => state.customer);
	//tst1
	useEffect(() => {
		dispatch(getCustomerByIdFunction(+id!));
	}, []);

	const onSubmitDeleteCustomer = async (id: number) => {
		await dispatch(deleteCustomerByIdFunction(+id));
		setOpenDelete(false);
		navigate('/customers', { replace: true });
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return <div>Error loading products</div>;
	}

	return (
		<div className="mx-auto max-w-[90%] mt-[35px]">
			<h1 className="font-semibold text-center text-[2rem] mb-5">
				Edit Customer - {oneCustomer.first_name.toUpperCase()} {oneCustomer.last_name.toUpperCase()}
			</h1>

			{/* Form And Delete Button Customer */}
			<div className="gap-y-5 mb-[30px]">
				<div className="p-5 bg-blue-500 rounded-lg shadow-lg w-full">
					<UpdateForm idCustomer={+id!} />
				</div>
				<button type="button" className="max-w-[50%] text-white px-4 py-2 rounded-global bg-red-700 mt-4" onClick={() => setOpenDelete(true)}>
					Delete Customer
				</button>

				{/* Open Box For Delete Product */}
				{OpenDelete && (
					<div className="w-screen h-screen fixed top-0 left-0 bg-[rgba(0,0,0,0.5)]">
						<div className="flex items-center justify-center flex-col w-full h-full">
							<h1 className="text-4xl text-white font-bold">Are you sure you want to delete the customer?</h1>
							<p className="text-xl text-white font-bold mt-3">If you delete the customer, all purchases made to it will also be deleted</p>
							<div className="flex items-center gap-x-10 mt-5">
								<button type="submit" className="max-w-[50%] text-white px-4 py-2 rounded-global bg-red-700" onClick={() => onSubmitDeleteCustomer(+id!)}>
									Delete
								</button>
								<button type="button" className="max-w-[50%] text-white px-4 py-2 rounded-global bg-gray-500" onClick={() => setOpenDelete(false)}>
									Cancel
								</button>
							</div>
						</div>
					</div>
				)}
			</div>

			{/* All Products */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-[30px]">
				{/* Product - Starting */}
				<ProductBox />
				{/* Product - End */}
			</div>
		</div>
	);
};

export default EditCustomer;
