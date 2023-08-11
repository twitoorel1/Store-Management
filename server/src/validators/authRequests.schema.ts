import * as yup from 'yup';
import { emailRegex, passwordRegex } from '../constants/regex.constant';
// import { EUserRoles } from '../types/global';

const loginRequestSchema = yup.object().shape({
	username: yup.string().required('username is required'),
	password: yup.string().required('password is required').matches(passwordRegex)
});

const registerRequestSchema = yup.object().shape({
	full_name: yup.string().required('full name is required'),
	username: yup.string().required('username is required'),
	email: yup.string().email().required('email is required').matches(emailRegex, 'Email not valid'),
	password: yup.string().required('password is required').matches(passwordRegex, 'Password not valid'),
	confirmPassword: yup
		.string()
		.required('Confirm Password is required')
		.oneOf([yup.ref('password')], 'Passwords must match')
});

export { registerRequestSchema, loginRequestSchema };
