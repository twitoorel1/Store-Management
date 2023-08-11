import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LayoutAuth from './layout/auth/LayoutAuth';
import LayoutMain from './layout/main/LayoutMain';
import Home from './pages/Home';
import Login from './pages/auth/Login';

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<LayoutMain />}>
					<Route index element={<Home />} />
				</Route>

				<Route path="/auth" element={<LayoutAuth />}>
					<Route index element={<Login />} />
				</Route>

				<Route path="*" element={<h4>Error 404</h4>} />
			</Routes>
		</BrowserRouter>
	);
}
