import * as Yup from 'yup';
import { passwordRegex } from '../../../constants/regex.constant';

const LoginValidationSchema = Yup.object().shape({
	username: Yup.string().required('username is required'),
	password: Yup.string().required('password is required').matches(passwordRegex, 'password is not valid')
});

export default LoginValidationSchema;
