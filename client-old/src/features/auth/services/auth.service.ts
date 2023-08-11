import axios from 'axios';
// import { FormLoginInputs } from '@/types/authTypes';
// import { getCookie } from '@/utils/cookies';

export const login = async (formValue: object) => {
	const response = await axios.post('http://localhost:4000/auth/login', formValue);
	return response.data;
};
