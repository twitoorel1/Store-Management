import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineShoppingCart, AiOutlineDollarCircle, AiOutlineGold, AiOutlineCloseCircle } from 'react-icons/ai';

const ProductBox = () => {
	const [openAdd, setOpenAdd] = useState(false);

	return (
		<div className="rounded-md shadow-md bg-blue-100 py-5">
			<div className="rounded-md bg-gray-100 p-2.5 mx-auto w-4/5">
				<div className="flex justify-center flex-col items-center gap-y-4">
					{/* Name */}
					<span className="flex items-center gap-x-2">
						<AiOutlineShoppingCart size={15} />
						<h1 className="text-base font-light underline">
							<Link to={'/'}>Iphone 14 Pro Max</Link>
						</h1>
					</span>

					{/* Price */}
					<span className="flex items-center gap-x-2">
						<AiOutlineDollarCircle size={15} />
						<h2 className="text-base font-light">4,500</h2>
					</span>

					{/* Amount */}
					<span className="flex items-center gap-x-2">
						<AiOutlineGold size={15} />
						<p className="text-base font-light">5</p>
					</span>
				</div>
			</div>

			{/* All Customers */}
			<div className="flex items-center justify-center gap-x-5 mt-5">
				<h1 className="text-[15px] font-light">
					<Link to={'/'}>Orel Twito</Link>
				</h1>
				<h2 className="text-[15px] font-light">18/08/2023</h2>
				<button className="cursor-pointer text-white rounded-md bg-blue-500 p-[5px]" onClick={() => setOpenAdd(true)}>
					Add
				</button>
			</div>

			{/* Open Add Product for customer */}
			{openAdd && (
				<div className="flex justify-center mt-5">
					<form className="flex flex-col items-center">
						<select className="mb-2">
							<option value="p1">Item 1</option>
							<option value="p2">Item 2</option>
							<option value="p3">Item 3</option>
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
	);
};

export default ProductBox;
