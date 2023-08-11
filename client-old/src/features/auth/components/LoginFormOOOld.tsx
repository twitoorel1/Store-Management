// import { FormLoginInputs } from '@/types/authTypes';
// import { ThunkDispatch } from 'redux-thunk';
// import { AnyAction } from 'redux';
// import { useDispatch } from 'react-redux';
// import { loginByPayload } from '../redux/authSlice';

// import { SubmitHandler, useForm } from 'react-hook-form';
// // import { yupResolver } from '@hookform/resolvers';
// // import loginValidationSchema from '../validations/loginSchema.validation';

// const LoginForm = () => {
// const {
// 	register,
// 	handleSubmit,
// 	formState: { errors }
// } = useForm<FormLoginInputs>({
// 	// resolver: yupResolver(loginValidationSchema),
// 	defaultValues: {
// 		username: '',
// 		password: ''
// 	},
// 	mode: 'onBlur',
// 	reValidateMode: 'onChange'
// });

// 	// const dispatch: ThunkDispatch<{}, {}, AnyAction> = useDispatch();
// 	const dispatch = useDispatch();

// 	// const onSubmitLogin2: SubmitHandler<FormLoginInputs> = async data => {
// 	// 	try {
// 	// 		await dispatch(loginByPayload(data));
// 	// 	} catch (error) {
// 	// 		console.log(error);
// 	// 	}
// 	// };

// function onSubmitLogin(data: FormLoginInputs) {
// 	dispatch({
// 		type: 'LOGIN',
// 		payload: data
// 	});
// }

// 	return (
// <form onSubmit={handleSubmit(onSubmitLogin)}>
// 	<input id="loginUsernameInput" type="text" placeholder="שם משתמש" register={{ ...register('username') }} />
// 	{errors.username && <span className="mx-5">{errors.username.message}</span>}

// 	<input id="loginPasswordInput" type="password" placeholder="סיסמה" register={{ ...register('password') }} />
// 	{errors.password && <span className="mx-5">{errors.password.message}</span>}

// 	<button type="submit">Login</button>
// </form>
// 	);
// };

// export default LoginForm;

import { FormLoginInputs } from '../../../types/authTypes';
import { useForm } from 'react-hook-form';
import { loginByPayload } from '../redux/authSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks';

const LoginForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<FormLoginInputs>({
		// resolver: yupResolver(loginValidationSchema),
		defaultValues: {
			username: '',
			password: ''
		},
		mode: 'onBlur',
		reValidateMode: 'onChange'
	});

	const dispatch = useAppDispatch();
	const { error, message } = useAppSelector(state => state.auth);

	function onSubmitLogin(data: FormLoginInputs) {
		// console.log(data);
		dispatch(loginByPayload(data));
	}

	return (
		<form onSubmit={handleSubmit(onSubmitLogin)}>
			<input id="loginUsernameInput" type="text" placeholder="שם משתמש" {...register('username')} />
			{errors.username && (
				<span className="mx-5">
					{message} || {error}
				</span>
			)}

			<input id="loginPasswordInput" type="password" placeholder="סיסמה" {...register('password')} />
			{errors.password && (
				<span className="mx-5">
					{message} || {error}
				</span>
			)}

			<button type="submit">Login</button>
		</form>
	);
};

export default LoginForm;
