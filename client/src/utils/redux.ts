import { createAsyncThunk } from '@reduxjs/toolkit';

export const performAsyncFunction = async <T>(func: (...args: any[]) => Promise<T>, ...params: any[]): Promise<T> => {
	try {
		const response = await func(...params);
		return response;
	} catch (error) {
		throw error;
	}
};

export const createDynamicAsyncThunk = <ReturnedType>(name: string, thunkFunction: (...args: any[]) => Promise<ReturnedType>, shouldSendParams: boolean) => {
	return createAsyncThunk(name, async (args: any[] | undefined, thunkAPI) => {
		try {
			let response;

			if (shouldSendParams) {
				response = await performAsyncFunction(thunkFunction, args);
			} else {
				response = await performAsyncFunction(thunkFunction);
			}

			return response;
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error);
		}
	});
};
