import { Routes, Route } from 'react-router-dom';
import AdminWrapper from './middleware/AdminWrapper';

import AuthLayout from '@/layouts/auth';
import MainLayout from '@/layouts/main';

// Pages
import Login from '@/pages/auth/Login';
import Home from '@/pages/Home';
import Products from '@/pages/products';
import EditProduct from '@/pages/products/EditProduct';
import Customers from '@/pages/customers';
import EditCustomer from '@/pages/customers/EditCustomer';
import Purchases from '@/pages/purchases';

// Errors Pages
import Error403 from './pages/Errors/Error403';
import Error404 from '@/pages/Errors/Error404';

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<MainLayout />}>
				<Route index element={<Home />} />

				<Route path="products">
					<Route index element={<Products />} />
					<Route
						path=":id"
						element={
							<AdminWrapper>
								<EditProduct />
							</AdminWrapper>
						}
					/>
				</Route>

				<Route path="customers">
					<Route index element={<Customers />} />
					<Route
						path=":id"
						element={
							<AdminWrapper>
								<EditCustomer />
							</AdminWrapper>
						}
					/>
				</Route>

				<Route path="purchases" element={<Purchases />} />
			</Route>

			<Route path="auth" element={<AuthLayout />}>
				<Route path="login" element={<Login />} />
			</Route>

			<Route path="403" element={<Error403 />} />
			<Route path="*" element={<Error404 />} />
		</Routes>
	);
};

export default App;
