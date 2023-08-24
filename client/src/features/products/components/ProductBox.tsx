import { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineShoppingCart, AiOutlineDollarCircle, AiOutlineGold, AiOutlineCloseCircle } from 'react-icons/ai';
import { getAllCustomerPurchaseByIdProductsFunction } from '../redux/productSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { RootState } from '../../../redux/store';

interface IProductProps {
	id: number;
	name: string;
	price: number;
	quantity: number;
	created_at: string;
	updated_at: string;
}

const ProductBox = ({ product, allProducts }: any) => {
	const dispatch = useAppDispatch();
	const [openAdd, setOpenAdd] = useState(false);
	const [optionSelect, setOptionSelect] = useState<number>(0);

	// const { customer_purchases } = useAppSelector((state: RootState) => state.product);

	// useEffect(() => {
	// dispatch(getAllCustomerPurchaseByIdProductsFunction(product.id));
	// }, [customer_purchases]);

	const addProductByCustomerId = async (e: any) => {
		e.preventDefault();
		console.log('Id Product: ' + optionSelect);
		// console.log('Id Customer: ' + customer.id);
	};

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
				{/* {customer_purchases.map((c: any, index: number) => {
					const dateObject: any = new Date(c.purchase_date).toLocaleDateString();
					return (
						<Fragment key={index}>
							<div className="flex items-center justify-center gap-x-5 mt-5">
								<h1 className="text-[15px] font-light">
									<Link to={'/'}>{c.customer_fullName}</Link>
								</h1>
								<h2 className="text-[15px] font-light">{dateObject}</h2>
								<button className="cursor-pointer text-white rounded-md bg-blue-500 p-[5px]" onClick={() => setOpenAdd(true)}>
									Add
								</button>
							</div>
						</Fragment>
					);
				})} */}

				{/* <div className="flex items-center justify-center gap-x-5 mt-5">
					<h1 className="text-[15px] font-light">
						<Link to={'/'}>{customerPurchases.customer_fullName}</Link>
					</h1>
					<h2 className="text-[15px] font-light">{customerPurchases.purchase_date}</h2>
					<button className="cursor-pointer text-white rounded-md bg-blue-500 p-[5px]" onClick={() => setOpenAdd(true)}>
						Add
					</button>
				</div> */}

				{/* Open Add Product for customer */}
				{openAdd && (
					<div className="flex justify-center mt-5">
						<form onSubmit={addProductByCustomerId} className="flex flex-col items-center">
							<select className="rounded-md mb-2" onChange={(e: any) => setOptionSelect(e.target.value)}>
								{allProducts.map((product: any, index: any) => (
									<Fragment key={index}>
										<option value="" hidden>
											Select Product
										</option>
										<option value={product.id}>{product.name}</option>
									</Fragment>
								))}
							</select>
							<button type="submit" className="bg-blue-500 p-[5px] cursor-pointer text-white rounded-md mt-2">
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
