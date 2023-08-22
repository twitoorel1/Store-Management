import CustomerBox from '../../components/productPage/CustomerBox';

export const EditProduct = () => {
	return (
		<div className="mx-auto max-w-[90%] mt-[35px]">
			<h1 className="font-semibold text-center text-[2rem] mb-5">Edit Product - (Name Product)</h1>

			{/* Form And Delete Button Product */}
			<div className="gap-y-5 mb-[30px]">
				<div className="p-5 bg-blue-500 rounded-lg shadow-lg w-full">
					<form className="flex px-3 py-2 flex-col gap-y-3">
						<input type="text" placeholder="Enter your text" className="rounded-md" /> {/* Name */}
						<input type="text" placeholder="Enter your text" className="rounded-md" /> {/* Price */}
						<input type="text" placeholder="Enter your text" className="rounded-md" /> {/* Quantity */}
						<button type="submit" className="max-w-fit px-12 py-2 bg-[#2563EB] text-white rounded-md mx-auto">
							Update Now
						</button>
					</form>
				</div>
				<button type="submit" className="max-w-[50%] text-white px-4 py-2 rounded-global bg-red-700 mt-4">
					Delete Product
				</button>
			</div>

			{/* All Customers */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-[30px]">
				{/* Customer - Starting */}
				<CustomerBox />
				<CustomerBox />
				<CustomerBox />
				<CustomerBox />
				<CustomerBox />
				<CustomerBox />
				<CustomerBox />
				<CustomerBox />
				<CustomerBox />
				{/* Customer - End */}
			</div>
		</div>
	);
};

export default EditProduct;
