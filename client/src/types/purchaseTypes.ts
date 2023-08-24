// interface Purchase State Redux
export interface IPurchaseState {
	// Status
	isLoading: boolean;
	isError: boolean;

	// From Server
	message: string | null;
	total_purchases: number | null;
	products: any[];
	customer_purchases: any[];
}
