import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { loginUser } from '../redux/authSlice';
import { FormLoginInputs } from '../../../types/authTypes';
import { yupResolver } from '@hookform/resolvers/yup';
import LoginValidation from '../validations/LoginValidation';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({
		resolver: yupResolver(LoginValidation),
		defaultValues: {
			username: '',
			password: ''
		},
		mode: 'onChange',
		reValidateMode: 'onChange'
	});

	const dispatch = useAppDispatch();
	const { message, isAuthenticated } = useAppSelector(state => state.auth);

	const onSubmitLogin = async (data: FormLoginInputs) => {
		try {
			const response = await dispatch(loginUser(data));
			setTimeout(() => {
				if (response.meta.requestStatus === 'fulfilled') {
					navigate('/', { replace: true });
				}
			}, 2000);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmitLogin)} className="flex flex-col items-center justify-center w-screen h-screen bg-gray-300">
			<input className="mb-4" type="text" {...register('username')} placeholder="username" />
			{errors.username && <p className="text-red-500">{errors.username.message}</p>}
			<input className="mb-4" type="text" {...register('password')} placeholder="password" />
			{errors.password && <p className="text-red-500">{errors.password.message}</p>}
			<button type="submit" className="p-3 bg-blue-300 rounded-md">
				Login
			</button>
			{isAuthenticated === false && <p>Test P</p>}
			<p>{message}</p>
		</form>
	);
};

export default LoginForm;
