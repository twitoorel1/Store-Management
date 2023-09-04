import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { IEditProductInputs } from '@/types/productTypes';
import { getByIdFunction, deleteByIdFunction, updateByIdFunction } from '@features/products/redux';
import CustomerBox from '@features/products/components/CustomerBox';
import UpdateForm from '@features/products/components/UpdateForm';
import { clearCustomersPurchases, getAllCustomersPurchasedByProductIdFunction } from '@/features/customers/redux';

interface purchaseProps {
	product_id: number;
	customer_id: number;
	customer_fullName: string;
	purchase_date: string;
}

const EditProduct = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [openDelete, setOpenDelete] = useState(false);
	const { oneProduct, isLoading } = useAppSelector(state => state.product);

	const { customersPurchases } = useAppSelector(state => state.customer);
	const productCustomersPurchases: purchaseProps[] = customersPurchases.map((p: purchaseProps) => p).filter((x: purchaseProps) => x.product_id === +id!);

	useEffect(() => {
		dispatch(getByIdFunction([id]));
		dispatch(getAllCustomersPurchasedByProductIdFunction([id]));

		return () => {
			dispatch(clearCustomersPurchases([]));
		};
	}, [dispatch, id]);

	const onSubmitDeleteProduct = async (id: number) => {
		try {
			await dispatch(deleteByIdFunction([id]));
			setOpenDelete(false);
			navigate('/products', { replace: true });
		} catch (error) {
			console.log(error);
		}
	};

	const onSubmitEditProduct = async (data: IEditProductInputs) => {
		try {
			await dispatch(updateByIdFunction([id, data]));
		} catch (error) {
			console.log(error);
		}
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="mx-auto max-w-[90%] mt-[35px]">
			<h1 className="font-semibold text-center text-[2rem] mb-5">
				Edit Product - {oneProduct.name.toUpperCase()} - ID: {oneProduct.id}
			</h1>

			{/* Form And Delete Button Product */}
			<div className="gap-y-5 mb-[30px]">
				<div className="p-5 bg-blue-500 rounded-lg shadow-lg w-full">
					<UpdateForm oneProduct={oneProduct} onSubmitFun={onSubmitEditProduct} />
				</div>
				<button type="button" className="max-w-[50%] text-white px-4 py-2 rounded-global bg-red-700 mt-4" onClick={() => setOpenDelete(true)}>
					Delete Product
				</button>

				{/* Open Box For Delete Product */}
				{openDelete && (
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
			<h1 className="font-semibold text-xl mb-2 underline underline-offset-4">Customers Purchases</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-[30px]">
				{/* Customer - Starting */}
				<CustomerBox productCustomersPurchases={productCustomersPurchases} />
				{/* Customer - End */}
			</div>
		</div>
	);
};

export default EditProduct;
