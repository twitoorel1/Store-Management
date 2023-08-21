import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineCloseCircle } from 'react-icons/ai';

const ProductBox = () => {
	const [openAdd, setOpenAdd] = useState(false);

	return (
		<div className="rounded-md shadow-md bg-blue-100 py-5">
			<div className="rounded-md bg-gray-100 p-2.5 mx-auto w-4/5">
				{/* Name */}
				<div className="flex justify-center items-center gap-x-[7px]">
					<span>
						<div className="p-0.5">
							<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
								<path d="M352 160v-32C352 57.42 294.579 0 224 0 153.42 0 96 57.42 96 128v32H0v272c0 44.183 35.817 80 80 80h288c44.183 0 80-35.817 80-80V160h-96zm-192-32c0-35.29 28.71-64 64-64s64 28.71 64 64v32H160v-32zm160 120c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24zm-192 0c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24z"></path>
							</svg>
						</div>
					</span>
					<h1 className="text-base font-light text-center underline">
						<Link to={'/'}>Iphone 14 Pro Max</Link>
					</h1>
				</div>

				{/* Price */}
				<div className="flex items-center gap-x-[7px] justify-center">
					<span>
						<div className="p-0.5">
							<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 288 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
								<path d="M209.2 233.4l-108-31.6C88.7 198.2 80 186.5 80 173.5c0-16.3 13.2-29.5 29.5-29.5h66.3c12.2 0 24.2 3.7 34.2 10.5 6.1 4.1 14.3 3.1 19.5-2l34.8-34c7.1-6.9 6.1-18.4-1.8-24.5C238 74.8 207.4 64.1 176 64V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48h-2.5C45.8 64-5.4 118.7.5 183.6c4.2 46.1 39.4 83.6 83.8 96.6l102.5 30c12.5 3.7 21.2 15.3 21.2 28.3 0 16.3-13.2 29.5-29.5 29.5h-66.3C100 368 88 364.3 78 357.5c-6.1-4.1-14.3-3.1-19.5 2l-34.8 34c-7.1 6.9-6.1 18.4 1.8 24.5 24.5 19.2 55.1 29.9 86.5 30v48c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-48.2c46.6-.9 90.3-28.6 105.7-72.7 21.5-61.6-14.6-124.8-72.5-141.7z"></path>
							</svg>
						</div>
					</span>
					<h1 className="text-base font-light text-center">4,500</h1>
				</div>

				{/* Amount */}
				<div className="flex justify-center items-center gap-x-[7px]">
					<span>
						<div className="p-0.5">
							<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
								<path d="M61.77 401l17.5-20.15a19.92 19.92 0 0 0 5.07-14.19v-3.31C84.34 356 80.5 352 73 352H16a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h22.83a157.41 157.41 0 0 0-11 12.31l-5.61 7c-4 5.07-5.25 10.13-2.8 14.88l1.05 1.93c3 5.76 6.29 7.88 12.25 7.88h4.73c10.33 0 15.94 2.44 15.94 9.09 0 4.72-4.2 8.22-14.36 8.22a41.54 41.54 0 0 1-15.47-3.12c-6.49-3.88-11.74-3.5-15.6 3.12l-5.59 9.31c-3.72 6.13-3.19 11.72 2.63 15.94 7.71 4.69 20.38 9.44 37 9.44 34.16 0 48.5-22.75 48.5-44.12-.03-14.38-9.12-29.76-28.73-34.88zM496 224H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0-160H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16V80a16 16 0 0 0-16-16zm0 320H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zM16 160h64a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8H64V40a8 8 0 0 0-8-8H32a8 8 0 0 0-7.14 4.42l-8 16A8 8 0 0 0 24 64h8v64H16a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8zm-3.91 160H80a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8H41.32c3.29-10.29 48.34-18.68 48.34-56.44 0-29.06-25-39.56-44.47-39.56-21.36 0-33.8 10-40.46 18.75-4.37 5.59-3 10.84 2.8 15.37l8.58 6.88c5.61 4.56 11 2.47 16.12-2.44a13.44 13.44 0 0 1 9.46-3.84c3.33 0 9.28 1.56 9.28 8.75C51 248.19 0 257.31 0 304.59v4C0 316 5.08 320 12.09 320z"></path>
							</svg>
						</div>
					</span>
					<h1 className="text-base font-light text-center">5</h1>
				</div>
			</div>
			{/* All Customers */}
			<div className="flex justify-center items-center gap-x-5 mt-5">
				<h1 className="text-[15px] font-light">
					<Link to={'/'}>Orel Twito</Link>
				</h1>
				<h2 className="text-[15px] font-light">18/08/2023</h2>
				<button className="cursor-pointer text-white rounded-global bg-blue-500 p-[5px]" onClick={() => setOpenAdd(true)}>
					Add
				</button>
			</div>

			{/* Open Add Product for customer */}
			{openAdd && (
				<div className="flex items-center justify-center mt-5">
					<form className="flex items-center justify-center flex-col">
						<select className="mb-2">
							<option value="p1">Item 1</option>
							<option value="p2">Item 2</option>
							<option value="p3">Item 3</option>
						</select>
						<button className="bg-blue-500 p-[5px] cursor-pointer text-white rounded-global mt-2" type="submit">
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
