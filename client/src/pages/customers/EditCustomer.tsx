import ProductBox from '../../components/customerPage/ProductBox';

const EditCustomer = () => {
	return (
		<div className="mx-auto max-w-[90%] mt-[35px]">
			<h1 className="font-semibold text-center text-[2rem] mb-5">Edit Customer - (Name Customer)</h1>

			{/* Form And Delete Button Customer */}
			<div className="gap-y-5 mb-[30px]">
				<div className="p-5 bg-blue-500 rounded-lg shadow-lg w-full">
					<form className="flex px-3 py-2 flex-col gap-y-3">
						<input type="text" placeholder="Enter your text" className="rounded-md" /> {/* First Name */}
						<input type="text" placeholder="Enter your text" className="rounded-md" /> {/* Last Name */}
						<input type="text" placeholder="Enter your text" className="rounded-md" /> {/* City */}
						<button type="submit" className="max-w-fit px-12 py-2 bg-[#2563EB] text-white rounded-md mx-auto">
							Update Now
						</button>
					</form>
				</div>
				<button type="submit" className="max-w-[50%] text-white px-4 py-2 rounded-global bg-red-700 mt-4">
					Delete Customer
				</button>
			</div>

			{/* All Products */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-[30px]">
				{/* Product - Starting */}
				<ProductBox />
				<ProductBox />
				<ProductBox />
				<ProductBox />
				<ProductBox />
				<ProductBox />
				<ProductBox />
				<ProductBox />
				<ProductBox />
				{/* Product - End */}
			</div>
		</div>
	);
};

export default EditCustomer;
