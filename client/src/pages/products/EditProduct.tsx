import { useEffect, useState, FC } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CustomerBox from '../../components/productPage/CustomerBox';
import UpdateForm from '../../features/products/components/UpdateForm';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { RootState } from '../../redux/store';
import { getProductById, deleteProductById } from '../../features/products/redux/productSlice';

export const EditProduct = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { oneProduct, isLoading, isError } = useAppSelector((state: RootState) => state.product);

	const [OpenDelete, setOpenDelete] = useState(false);

	useEffect(() => {
		dispatch(getProductById(+id!));
	}, [dispatch]);

	const onSubmitDeleteProduct = async (id: number) => {
		await dispatch(deleteProductById(+id));
		setOpenDelete(false);
		navigate('/products', { replace: true });
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return <div>Error loading products</div>;
	}

	return (
		<div className="mx-auto max-w-[90%] mt-[35px]">
			<h1 className="font-semibold text-center text-[2rem] mb-5">Edit Product - {oneProduct.name.toUpperCase()}</h1>

			{/* Form And Delete Button Product */}
			<div className="gap-y-5 mb-[30px]">
				<div className="p-5 bg-blue-500 rounded-lg shadow-lg w-full">
					<UpdateForm idProduct={+id!} />
				</div>
				<button type="button" className="max-w-[50%] text-white px-4 py-2 rounded-global bg-red-700 mt-4" onClick={() => setOpenDelete(true)}>
					Delete Product
				</button>

				{/* Open Box For Delete Product */}
				{OpenDelete && (
					<div className="w-screen h-screen fixed top-0 left-0 bg-[rgba(0,0,0,0.5)]">
						<div className="flex items-center justify-center flex-col w-full h-full">
							<h1 className="text-4xl text-white font-bold">Are you sure you want to delete the product?</h1>
							<p className="text-xl text-white font-bold mt-3">If you delete the product, all purchases made to it will also be deleted</p>
							<div className="flex items-center gap-x-10 mt-5">
								<button type="submit" className="max-w-[50%] text-white px-4 py-2 rounded-global bg-red-700" onClick={() => onSubmitDeleteProduct(+id!)}>
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

			{/* All Customers */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-[30px]">
				{/* Customer - Starting */}
				<CustomerBox />
				{/* Customer - End */}
			</div>
		</div>
	);
};

export default EditProduct;
