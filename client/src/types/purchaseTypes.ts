export interface IPurchase {
	id: number;
	customers_id: number;
	products_id: number;
	date: string;
	updated_at: string;
}

// interface Purchase State Redux
export interface IPurchaseState {
	// Status
	isLoading: boolean;
	isError: boolean;

	// From Server
	message: string | null;
	total_purchases: number | null;
	allPurchases: IPurchase[];
	onePurchase: IPurchase;
}

export interface IEditPurchaseInputs {
	customers_id?: number;
	products_id?: number;
	date?: Date;
}
