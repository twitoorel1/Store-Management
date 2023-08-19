import { FaRegMoneyBillAlt } from 'react-icons/fa';

const Products = () => {
	return (
		<div className="px-4 py-10 bg-blue-100 shadow-md mt-[35px] mx-auto md:max-w-7xl md:px-24 lg:px-8 lg:py-12">
			<div className="flex items-center flex-col md:flex-row">
				<div className="w-1/2 flex items-center mb-6 lg:mb-0 2xl:w-4/5">
					<h3 className="text-3xl text-center font-bold">Total Purchases:</h3>
				</div>
				<div className="w-1/2 flex items-center justify-center gap-x-3 bg-white p-2.5 rounded-md shadow-md 2xl:w-1/5">
					<span className="text-primary-500">
						<FaRegMoneyBillAlt size={35} />
					</span>
					<h4 className="text-3xl font-semibold text-center">21,123</h4>
				</div>
			</div>
		</div>
	);

	// return (
	// 	<div className=" mx-auto px-4 py-10 mt-[35px] md:max-w-full md:px-24 lg:px-8 lg:py-12 max-w-7xl 2xl:max-w-[90%]">
	// 		<h1 className="text-3xl font-semibold text-center mb-[25px]">Products Page</h1>
	// 		<div className="grid gap-4 md:gap-8 md:grid-cols-3 2xl:grid-cols-1 2xl:gap-[25px]">
	// 			<div className="grid-cols-1 flex flex-col items-center gap-4 px-8 py-6 bg-white shadow-md border-black rounded-global md:gap-6 2xl:grid">
	// 				<table className="text-center table-auto w-full min-h-[100px] 2xl:w-4/5">
	// 					<tr className="border-b">
	// 						<th>Name Product</th>
	// 						<th>Price</th>
	// 						<th>Amount</th>
	// 					</tr>
	// 					{/* Map array Start */}
	// 					<tr className="border-b">
	// 						<td>Iphone 14 Pro Max</td>
	// 						<td>4500</td>
	// 						<td>5</td>
	// 					</tr>
	// 					{/* Map array End */}
	// 				</table>
	// 				<p className="max-w-md text-black text-left font-bold w-full lg:text-lg">Customers Purchased</p>
	// 				<table className="text-center table-auto w-full min-h-[150px] 2xl:w-4/5">
	// 					<tr className="border-b">
	// 						<th>Name Customer</th>
	// 						<th>Date</th>
	// 						<th>Action</th>
	// 					</tr>
	// 					{/* Map array Start */}
	// 					<tr className="border-b">
	// 						<td>Orel Twito</td>
	// 						<td>06/08/2023</td>
	// 						<td className="flex items-center justify-center">
	// 							<span className="text-xl cursor-pointer">
	// 								<div className="p-0.5">
	// 									<AiFillPlusCircle size={22} />
	// 								</div>
	// 							</span>
	// 						</td>
	// 					</tr>
	// 					{/* Map array End */}
	// 				</table>
	// 			</div>
	// 		</div>
	// 	</div>
	// );
};

export default Products;
