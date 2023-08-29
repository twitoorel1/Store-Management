import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

const menuItems = [
	{
		name: 'Home',
		link: '/'
	},
	{
		name: 'Products',
		link: '/products'
	},
	{
		name: 'Customers',
		link: '/customers'
	},
	{
		name: 'Purchases',
		link: '/purchases'
	}
];

interface MenuItems {
	name: string;
	link: string;
}

const Header = () => {
	const [openMenu, setOpenMenu] = useState(false);

	return (
		<header className="container px-4 py-4 text-black bg-gray-300">
			<div className="flex items-center">
				{/* Logo */}
				<div className="flex items-center justify-center w-3/5 md:w-2/5">
					<img src="./logo.png" alt="Logo" width={50} height={50} />
					<span className="text-xl font-medium">Store Management</span>
				</div>

				{/* Menu */}
				<span onClick={() => setOpenMenu(true)} className="p-3 mx-auto text-white bg-black rounded-full shadow-md cursor-pointer md:hidden">
					<AiOutlineMenu size={25} />
				</span>
				{openMenu && (
					<div className="absolute top-0 right-0 z-50 w-screen h-screen bg-gray-100">
						<div className="flex items-center justify-center">
							<h1 className="py-10 text-3xl font-bold text-center">Menu</h1>
							<span className="p-3 text-white bg-black rounded-full shadow-md" onClick={() => setOpenMenu(false)}>
								<AiOutlineClose size={25} />
							</span>
						</div>

						<ul className="w-2/5 mx-auto text-center">
							{menuItems.map((item: MenuItems, index: number) => (
								<li key={index} className="py-3">
									<Link to={item.link} className="block px-4 py-2 bg-gray-200 rounded-md shadow-md hover:bg-gray-200">
										{item.name}
									</Link>
								</li>
							))}
						</ul>
					</div>
				)}

				<ul className="items-center justify-center hidden w-3/5 mx-auto text-center md:flex">
					{menuItems.map((item: MenuItems, index: number) => (
						<li key={index} className="px-2">
							<Link to={item.link} className="block px-4 py-2 bg-gray-200 rounded-md shadow-md hover:bg-gray-200">
								{item.name}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</header>
	);
};

export default Header;
