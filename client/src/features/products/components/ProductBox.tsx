import { useState, useEffect, Fragment, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineShoppingCart, AiOutlineDollarCircle, AiOutlineGold, AiOutlineCloseCircle } from 'react-icons/ai';
import { getAllCustomersPurchasedByProductIdFunction, clearCustomersPurchases } from '@features/customers/redux';
import { createOneFunction } from '@features/purchases/redux';
import { IProduct } from '@/types/productTypes';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';

interface purchaseProps {
	product_id: number;
	customer_id: number;
	customer_fullName: string;
	purchase_date: string;
}

const ProductBox = ({ product, allProducts }: { product: IProduct; allProducts: IProduct[] }) => {
	const dispatch = useAppDispatch();
	const [openAdd, setOpenAdd] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState({ productId: '', customerId: '' });
	const { customersPurchases, isLoading } = useAppSelector(state => state.customer);
	// const productCustomersPurchases: purchaseProps[] = customersPurchases.flat().filter((purchase: purchaseProps) => purchase.product_id === product.id);
	const productCustomersPurchases: purchaseProps[] = customersPurchases.map((p: purchaseProps) => p).filter((x: purchaseProps) => x.product_id === product.id);

	useEffect(() => {
		dispatch(getAllCustomersPurchasedByProductIdFunction([product.id]));

		return () => {
			dispatch(clearCustomersPurchases([]));
		};
	}, [dispatch, product.id]);

	const handleAddButtonClick = (purchase: any) => {
		setSelectedProduct({ productId: purchase.product_id, customerId: purchase.customer_id });
		setOpenAdd(true);
	};

	const handleSubmitAddProduct = async (e: any) => {
		e.preventDefault();

		const data = {
			products_id: selectedProduct.productId,
			customers_id: selectedProduct.customerId
		};

		await dispatch(createOneFunction([data]));

		// console.log('Id Product: ' + selectedProduct.productId);
		// console.log('Id Customer: ' + selectedProduct.customerId);

		setTimeout(() => {
			setOpenAdd(false);
		}, 500);
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<div className="rounded-md shadow-md bg-blue-100 py-5">
				<div className="rounded-md bg-gray-100 p-2.5 mx-auto w-4/5">
					<div className="flex justify-center flex-col items-center gap-y-4">
						{/* Name */}
						<span className="flex items-center gap-x-2">
							<AiOutlineShoppingCart size={15} />
							<span>ID: {product.id}</span>
							<h1 className="text-base font-light underline">
								<Link to={`/products/${product.id}`}>{product.name}</Link>
							</h1>
						</span>

						{/* Price */}
						<span className="flex items-center gap-x-2">
							<AiOutlineDollarCircle size={15} />
							<h2 className="text-base font-light">{product.price}</h2>
						</span>

						{/* Amount */}
						<span className="flex items-center gap-x-2">
							<AiOutlineGold size={15} />
							<p className="text-base font-light">{product.quantity}</p>
						</span>
					</div>
				</div>

				{/* All Customers */}
				{productCustomersPurchases.map((purchase: any, index: number) => {
					const dateObject: any = new Date(purchase.purchase_date).toLocaleDateString();

					return (
						<Fragment key={index}>
							<div className="flex items-center justify-center gap-x-5 mt-5">
								<span>
									c{purchase.customer_id} p{purchase.product_id}
								</span>
								<h1 className="text-[15px] font-light">
									<Link to={`/customers/${purchase.customer_id}`}>{purchase.customer_fullName}</Link>
								</h1>
								<h2 className="text-[15px] font-light">{dateObject}</h2>
								<button type="button" className="text-white rounded-md bg-blue-500 p-[5px]" onClick={() => handleAddButtonClick(purchase)}>
									Add
								</button>
							</div>
						</Fragment>
					);
				})}

				{openAdd && (
					<div className="flex justify-center mt-5">
						<form onSubmit={handleSubmitAddProduct} className="flex flex-col items-center">
							<select className="rounded-md mb-2" onChange={(e: any) => setSelectedProduct({ ...selectedProduct, productId: e.target.value })}>
								{allProducts.map((product: any, index: any) => (
									<Fragment key={index}>
										<option value="" hidden>
											Select Product
										</option>
										<option value={product.id}>{product.name}</option>
									</Fragment>
								))}
							</select>
							<button type="submit" className="bg-blue-500 p-[5px] text-white rounded-md mt-2">
								Save
							</button>
							<span onClick={() => setOpenAdd(false)} className="cursor-pointer mt-4">
								<AiOutlineCloseCircle size={25} />
							</span>
						</form>
					</div>
				)}
			</div>
		</>
	);
};

export default ProductBox;
