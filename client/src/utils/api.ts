import axios, { AxiosInstance } from 'axios';
import { getCookie } from './cookies';

const api: AxiosInstance = axios.create({
	baseURL: 'http://localhost:4000',
	timeout: 5000, // 5 seconds timeout
	headers: {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${getCookie('token')}`
	}
});

// define types for API response data and error message
interface ApiResponse<T> {
	data: T;
}

interface ApiError {
	error?: boolean;
	message?: string;
	stack?: string;
}

// define a helper function to handle response data
function handleApiResponse<T>(response: ApiResponse<T>) {
	return response.data;
}

// define a helper function to handle error message
function handleApiError(error: ApiError | any) {
	console.error(error.message);
}

export { api, handleApiResponse, handleApiError };
