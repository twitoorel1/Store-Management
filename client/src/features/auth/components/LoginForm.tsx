import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { IFormLoginInputs } from '@/types/authTypes';
import { yupResolver } from '@hookform/resolvers/yup';
import LoginValidationSchema from '../validations/LoginValidation';
import { loginUser } from '../redux';

const LoginForm = () => {
	const dispatch = useAppDispatch();
	const { isLoading, message } = useAppSelector(state => state.auth);

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<IFormLoginInputs>({
		resolver: yupResolver(LoginValidationSchema),
		defaultValues: {
			username: '',
			password: ''
		},
		mode: 'onChange',
		reValidateMode: 'onChange'
	});

	const onSubmitLogin = async (data: IFormLoginInputs) => {
		try {
			await dispatch(loginUser([data]));
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmitLogin)} className="flex flex-col items-center justify-center w-screen h-screen bg-gray-300">
			<input type="text" placeholder="Username" className="mb-4" {...register('username')} />
			<input type="password" placeholder="Password" className="mb-4" {...register('password')} />
			<button type="submit" className="p-3 bg-blue-300 rounded-md">
				Login
			</button>
			{isLoading ? <span>Loading...</span> : null}
			<p className="mt-4">{message}</p>
		</form>
	);
};

export default LoginForm;
