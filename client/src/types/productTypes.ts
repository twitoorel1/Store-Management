export interface IProduct {
	id: number;
	name: string;
	price: number;
	quantity: number;
	created_at: string;
	updated_at: string;
}

// interface Product State Redux
export interface IProductState {
	// Status
	isLoading: boolean;
	isError: boolean;

	// From Server
	message: string | null;
	allProducts: IProduct[];
	productsPurchases: any[];
	oneProduct: IProduct;
}

export interface IEditProductInputs {
	name?: string;
	price?: number;
	quantity?: number;
}
