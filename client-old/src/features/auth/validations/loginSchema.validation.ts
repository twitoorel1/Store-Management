import * as Yup from 'yup';

const loginValidationSchema = Yup.object().shape({
	username: Yup.string().required(),
	password: Yup.string().required()
});

export default loginValidationSchema;
