import { Routes, Route } from 'react-router-dom';
import LayoutAuth from './layouts/auth';
import LayoutMain from './layouts/main';

// Pages
import Home from './pages/Home';
import Products from './pages/products/Products';
import EditProduct from './pages/products/EditProduct';
import Customers from './pages/customers/Customers';
import EditCustomer from './pages/customers/EditCustomer';
import Purchases from './pages/purchases/Purchases';

import Login from './pages/auth/Login';
import Error404 from './pages/Errors/Error404';

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<LayoutMain />}>
				<Route index element={<Home />} />

				<Route path="products">
					<Route index element={<Products />} />
					<Route path=":id" element={<EditProduct />} />
				</Route>

				<Route path="customers">
					<Route index element={<Customers />} />
					<Route path=":id" element={<EditCustomer />} />
				</Route>

				<Route path="purchases" element={<Purchases />} />
			</Route>

			<Route path="/auth" element={<LayoutAuth />}>
				<Route path="login" element={<Login />} />
			</Route>

			<Route path="*" element={<Error404 />} />
		</Routes>
	);
};

export default App;
