import { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { clearProductsPurchases, getAllFunction, getAllProductsPurchaseByCustomerIdFunction } from '@features/products/redux';
import { createOneFunction } from '@/features/purchases/redux';

interface ProductPurchaseProps {
	product_id: 1;
	customer_id: 2;
	product_name: 'Computer';
	purchase_date: '2023-08-24T17:37:46.000Z';
}

const CustomerBox = ({ customer, allCustomers }: { customer: any; allCustomers: any }) => {
	const dispatch = useAppDispatch();
	const [openBuyNow, setOpenBuyNow] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState({ productId: '', customerId: '' });
	const { allProducts, productsPurchases, isLoading } = useAppSelector(state => state.product);

	useEffect(() => {
		dispatch(getAllFunction());
	}, [dispatch]);

	useEffect(() => {
		dispatch(getAllProductsPurchaseByCustomerIdFunction([customer.id]));

		return () => {
			dispatch(clearProductsPurchases([]));
		};
	}, [dispatch, customer.id]);

	const handleAddProductByCustomerId = async (e: any) => {
		e.preventDefault();

		const data = {
			products_id: selectedProduct,
			customers_id: customer.id
		};

		await dispatch(createOneFunction([data]));

		// console.log('Id Product: ' + selectedProduct);
		// console.log('Id Customer: ' + customer.id);

		setTimeout(() => {
			setOpenBuyNow(false);
		}, 500);
	};

	const productsPurchasesFilter: ProductPurchaseProps[] = productsPurchases.flat().filter((purchase: ProductPurchaseProps) => purchase.customer_id === customer.id);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="rounded-md shadow-md bg-blue-100 py-5 px-5">
			<div className="rounded-md bg-gray-100 p-2.5 mx-auto w-4/5">
				<div className="flex justify-center items-center gap-x-[7px]">
					<span>
						<div className="p-0.5">
							<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
								<path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm95.8 32.6L272 480l-32-136 32-56h-96l32 56-32 136-47.8-191.4C56.9 292 0 350.3 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-72.1-56.9-130.4-128.2-133.8z"></path>
							</svg>
						</div>
					</span>
					{customer.id}
					<h1 className="text-base font-light underline">
						<Link to={`/customers/${customer.id}`}>
							{customer.first_name} {customer.last_name}
						</Link>
					</h1>
				</div>
			</div>

			{/* Get All products purchased by (id customer) */}
			{productsPurchasesFilter.map((purchase: any, index: number) => (
				<Fragment key={index}>
					<div className="flex items-center justify-center mt-5">
						<div className="flex items-center justify-between gap-x-5">
							<Link to={`/products/${purchase.product_id}`}>{purchase.product_name}</Link>
						</div>
					</div>
				</Fragment>
			))}

			<button type="button" className="text-white bg-blue-500 rounded-md p-[5px] w-full mt-7" onClick={() => setOpenBuyNow(true)}>
				Buy Product
			</button>

			{/* Open in Click 'Buy Product' */}
			{openBuyNow && (
				<div className="mt-5 bg-blue-500 p-2.5 shadow-md rounded-md">
					<form onSubmit={handleAddProductByCustomerId} className="flex items-center flex-col gap-y-3 px-3 py-2">
						<select className="rounded-md mb-2" onChange={(e: any) => setSelectedProduct(e.target.value)}>
							{allProducts.map((product: any, index: number) => (
								<Fragment key={index}>
									<option value="" hidden>
										Select Product
									</option>
									<option value={product.id}>{product.name}</option>
								</Fragment>
							))}
						</select>
						<button type="submit" className="max-w-fit px-12 py-2 bg-white text-blue-500 rounded-md mx-auto font-semibold">
							Buy
						</button>
						<span onClick={() => setOpenBuyNow(false)} className="cursor-pointer mt-3 mx-auto">
							<AiOutlineCloseCircle size={25} />
						</span>
					</form>
				</div>
			)}
		</div>
	);
};

export default CustomerBox;
