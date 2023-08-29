import { Link } from 'react-router-dom';

interface purchaseProps {
	product_id: number;
	customer_id: number;
	customer_fullName: string;
	purchase_date: string;
}
const CustomerBox = ({ productCustomersPurchases }: { productCustomersPurchases: purchaseProps[] }) => {
	return (
		<ul className="rounded-md shadow-md bg-blue-100 py-5">
			{productCustomersPurchases.map((customer: purchaseProps, index: number) => (
				<li key={index} className="rounded-md bg-gray-100 p-2.5 mx-auto w-4/5">
					<Link to={`/customers/${customer.customer_id}`}>{customer.customer_fullName}</Link>
				</li>
			))}
		</ul>
	);
};

export default CustomerBox;
