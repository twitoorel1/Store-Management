import { useEffect } from 'react';
import { FaRegMoneyBillAlt } from 'react-icons/fa';
import { getAllFunction } from '@features/products/redux';
import { getTotalPurchasesFunction } from '@features/purchases/redux';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import ProductBox from '@features/products/components/ProductBox';

const Product = () => {
	const dispatch = useAppDispatch();
	const { allProducts } = useAppSelector(state => state.product);
	const { total_purchases } = useAppSelector(state => state.purchase);

	useEffect(() => {
		dispatch(getAllFunction());
		dispatch(getTotalPurchasesFunction());
	}, [dispatch]);

	return (
		<div>
			{/* Head */}
			<div className="px-4 py-10 md:px-24 lg:px-8 lg:py-12 bg-blue-100 shadow-md mt-[35px] mx-auto md:max-w-7xl max-w-full">
				<div className="flex items-center flex-col md:flex-row">
					<div className="w-1/2 mb-6 lg:mb-0 h-12 flex items-center justify-center">
						<h3 className="text-2xl text-center font-bold">Total Purchases:</h3>
					</div>
					<div className="w-1/2 xl:w-1/5 h-12 bg-white p-2.5 rounded-md shadow-md flex items-center justify-center gap-x-3">
						<span className="text-blue-500">
							<FaRegMoneyBillAlt size={35} />
						</span>
						<h4 className="text-2xl font-semibold text-center">$ {total_purchases}</h4>
					</div>
				</div>
			</div>

			{/* Products */}
			<div className="mx-auto max-w-[90%] mt-[35px]">
				<h1 className="font-semibold text-center text-[2rem] mb-[20px]">Products Page</h1>

				{/* Grid All Products */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-[30px]">
					{/* Product Box - Starting */}
					{allProducts.map((product: any, index: number) => (
						<ProductBox key={index} product={product} allProducts={allProducts} />
					))}
					{/* Product Box - End */}
				</div>
			</div>
		</div>
	);
};

export default Product;
