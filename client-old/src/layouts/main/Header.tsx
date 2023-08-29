import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { Menu } from '@headlessui/react';

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
		<header className="flex items-center justify-between py-5 text-sm bg-cover bg-gradient-to-t from-primary-50 [5ms] px-12 relative leading-6 h-[100px]">
			{/* Logo */}
			<div className="flex items-center gap-[5px] w-3/5 md:w-[45%] xl:w-2/5">
				<span className="text-gray-900 text-xl">
					<div className="p-0.5">
						<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 640 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
							<path d="M320 384H128V224H64v256c0 17.7 14.3 32 32 32h256c17.7 0 32-14.3 32-32V224h-64v160zm314.6-241.8l-85.3-128c-6-8.9-16-14.2-26.7-14.2H117.4c-10.7 0-20.7 5.3-26.6 14.2l-85.3 128c-14.2 21.3 1 49.8 26.6 49.8H608c25.5 0 40.7-28.5 26.6-49.8zM512 496c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V224h-64v272z"></path>
						</svg>
					</div>
				</span>
				<span className="text-gray-900 tracking-wide uppercase font-semibold text-xl text-center hidden sm:flex">STORE MANAGEMENT</span>
				<span className="text-gray-900 tracking-wide uppercase font-semibold text-xl text-center flex sm:hidden">S.M</span>
			</div>

			{/* Menu */}
			<ul className="items-center w-[55%] text-gray-600 gap-[50px] gap-x-[45px] justify-center font-semibold text-sm hidden hover:text-gray-900 md:flex xl:w-3/5 xl:gap-x-[70px] xl:text-base 2xl:text-lg">
				{menuItems.map((item: MenuItems, index: number) => (
					<li key={index}>
						<Link to={item.link}>{item.name}</Link>
					</li>
				))}
			</ul>

			{/* Menu Phone */}
			<Menu as="div" className="flex w-2/5 justify-end relative md:hidden">
				<Menu.Button as="button" className="inline-flex justify-center rounded-mdpx-4 p-3 text-sm font-medium hover:bg-opacity-30 cursor-pointer">
					<span className="w-fit p-1.5" onClick={() => setOpenMenu(true)}>
						<AiOutlineMenu size={25} />
					</span>
				</Menu.Button>
				{openMenu && (
					<Menu.Items as="ul" className="right-0 top-0 w-screen h-screen p-10 [15ms] fixed bg-white ui-open:[250ms]">
						<div className="flex items-center justify-around mb-[25px]">
							<p className="text-center text-5xl leading-[5rem] font-black text-black">Menu</p>
							<span className="text-[2.5rem] text-black cursor-pointer [15ms]" onClick={() => setOpenMenu(false)}>
								<div className="p-1.5">
									<AiOutlineClose size={25} />
								</div>
							</span>
						</div>
						{menuItems.map((item: MenuItems, index: number) => (
							<Menu.Item as="li" className="group py-2 px-2 w-full text-base font-semibold text-center border-black">
								<Link to={item.link} className="text-center rounded-md cursor-pointer font-bold text-[17px] border-black py-2.5 px-[25px] bg-gradient-to-t bg-gray-100 bg-cover flex justify-center items-center">
									{item.name}
								</Link>
							</Menu.Item>
						))}
					</Menu.Items>
				)}
			</Menu>
		</header>
	);
};

export default Header;
