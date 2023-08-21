import React from 'react';
import { Link } from 'react-router-dom';

export const EditProduct = () => {
	return (
		<div className="mx-auto max-w-[90%] mt-[35px]">
			<h1 className="font-semibold text-center text-[2rem] mb-5">Edit Product</h1>

			{/* Form And Delete Button Product */}
			<div className="grid grid-cols-1 gap-y-5 mb-[30px]">
				<div className="p-5 bg-blue-500 rounded-lg shadow-lg w-full">
					<form className="flex px-3 py-2 flex-col gap-y-3">
						<input className="rounded-global" placeholder="Enter your text" /> {/* Name */}
						<input className="rounded-global" placeholder="Enter your text" /> {/* Price */}
						<input className="rounded-global" placeholder="Enter your text" /> {/* Quantity */}
						<button className="max-w-fit px-12 py-2 bg-primary-500 text-white rounded-global mx-auto" type="submit">
							<span>Update Now</span>
						</button>
					</form>
				</div>
				<button className="max-w-[50%] cursor-pointer text-white px-4 py-2 rounded-global bg-red-700 mx-auto">
					<span>Delete Product</span>
				</button>

				<div></div>
			</div>

			{/* All Customers */}
			<div className="grid grid-cols-1 gap-[30px] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl: 2xl:grid-cols-5">
				{/* Customer - Starting */}
				<div className="rounded-md shadow-md bg-blue-100 py-5">
					<div className="rounded-md bg-gray-100 p-2.5 mx-auto w-4/5">
						<h1 className="text-base font-light text-center">
							<Link to={'/'}>Orel Twito</Link>
						</h1>
					</div>
				</div>
				{/* Customer - End */}
			</div>
		</div>
	);
};

export default EditProduct;