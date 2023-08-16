import { Routes, Route } from 'react-router-dom';
import LayoutAuth from './layouts/auth';
import LayoutMain from './layouts/main';

// Pages
import Home from './pages/Home';
import Products from './pages/Products';
import Customers from './pages/Customers';
import Purchases from './pages/Purchases';
import Login from './pages/auth/Login';
import Error404 from './pages/Errors/Error404';

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<LayoutMain />}>
				<Route index element={<Home />} />
				<Route path="products" element={<Products />} />
				<Route path="customers" element={<Customers />} />
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
