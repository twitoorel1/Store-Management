import { FormLoginInputs } from '@/types/authTypes';
import { useAppDispatch } from '../../../hooks';
import { loginByPayload } from '../redux/authSlice';

import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import loginValidationSchema from '../validations/loginSchema.validation';

const LoginForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<FormLoginInputs>({
		resolver: yupResolver(loginValidationSchema),
		defaultValues: {
			username: '',
			password: ''
		},
		mode: 'onBlur',
		reValidateMode: 'onChange'
	});

	const dispatch = useAppDispatch();

	const onSubmitLogin: SubmitHandler<FormLoginInputs> = async (data: FormLoginInputs) => {
		const res = await dispatch(loginByPayload(data));
		console.log(res);
		return res;
	};

	return (
		<form onSubmit={handleSubmit(onSubmitLogin)}>
			<input type="text" placeholder="Username" {...register('username')} />
			{errors.username && <p className="error-message">{errors.username.message}</p>}
			<input type="text" placeholder="Password" {...register('password')} />
			{errors.password && <p className="error-message">{errors.password.message}</p>}
			<button type="submit">Login</button>
		</form>
	);
};

export default LoginForm;
