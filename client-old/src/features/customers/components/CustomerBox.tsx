import { useState, useEffect, Fragment } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { RootState } from '../../../redux/store';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { getAllProductsFunction } from '../../products/redux/productSlice';

const CustomerBox = ({ customer, allCustomers }: any) => {
	const dispatch = useAppDispatch();
	const [openBuyNow, setOpenBuyNow] = useState(false);
	const [optionSelect, setOptionSelect] = useState<number>(0);
	const { products } = useAppSelector((state: RootState) => state.product);

	useEffect(() => {
		dispatch(getAllProductsFunction());
	}, []);

	const addProductByCustomerId = async (e: any) => {
		e.preventDefault();
		console.log('Id Product: ' + optionSelect);
		console.log('Id Customer: ' + customer.id);
	};

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
			<div className="flex justify-center items-center gap-x-5 mt-5">
				<ul className="list-disc list-inside">
					{products
						.filter(p => p.id === 1)
						.map((product: any, index: number) => (
							<li key={index}>
								<Link to={`/products/${product.id}`}>{product.name}</Link>
							</li>
						))}
					{/* <li className="flex items-center gap-x-3 mb-3">
						<Link to={'/'}>Iphone 14 Pro Max</Link>
					</li> */}
				</ul>
			</div>

			<button className="bg-primary text-white py-2 rounded-global w-full px-4 mt-3" onClick={() => setOpenBuyNow(true)}>
				Buy Product
			</button>

			{/* Open in Click 'Buy Product' */}
			{openBuyNow && (
				<div className="mt-5 bg-blue-500 p-2.5 shadow-md rounded-md">
					<form onSubmit={addProductByCustomerId} className="flex items-center flex-col gap-y-3 px-3 py-2">
						<select className="rounded-md mb-2" onChange={(e: any) => setOptionSelect(e.target.value)}>
							{products.map((product: any, index: number) => (
								<Fragment key={index}>
									<option value="" hidden>
										Select Product
									</option>
									<option value={product.id}>{product.name}</option>
								</Fragment>
							))}
						</select>
						<button className="max-w-fit px-12 py-2 bg-primary-500 text-white rounded-global mx-auto" type="submit" onClick={() => setOpenBuyNow(true)}>
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
