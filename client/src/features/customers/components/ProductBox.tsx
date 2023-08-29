import { Link } from 'react-router-dom';

interface IProductPurchaseProps {
	product_id: 1;
	customer_id: 2;
	product_name: 'Computer';
	purchase_date: '2023-08-24T17:37:46.000Z';
}

const ProductBox = ({ productsPurchasesFilter }: { productsPurchasesFilter: IProductPurchaseProps[] }) => {
	return (
		<ul className="rounded-md shadow-md bg-blue-100 py-5">
			{productsPurchasesFilter.map((product: IProductPurchaseProps, index: number) => (
				<li key={index} className="rounded-md bg-gray-100 p-2.5 mx-auto w-4/5">
					<Link to={`/products/${product.product_id}`}>{product.product_name}</Link>
				</li>
			))}
		</ul>
	);
};

export default ProductBox;
