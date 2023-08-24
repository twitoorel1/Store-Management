export interface ICustomer {
	id: number;
	first_name: string;
	last_name: string;
	city: string;
	created_at: string;
	updated_at: string;
}

// interface Customer State Redux
export interface ICustomerState {
	// Status
	isLoading: boolean;
	isError: boolean;

	// From Server
	message: string | null;
	customers: any[];
	oneCustomer: ICustomer;
}

export interface IEditCustomerInputs {
	first_name?: string;
	last_name?: string;
	city?: string;
}
