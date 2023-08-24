import { FC } from 'react';
import { RootState } from '../../../redux/store';
import { IEditCustomerInputs } from '../../../types/customerTypes';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';

import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
import { updateCustomerByIdFunction } from '../redux/customerSlice';

const UpdateForm: FC<any> = ({ idCustomer }) => {
	const dispatch = useAppDispatch();
	const { oneCustomer } = useAppSelector((state: RootState) => state.customer);
	console.log(oneCustomer);
	const {
		register,
		handleSubmit
		// formState: { errors }
	} = useForm<IEditCustomerInputs>({
		// resolver: yupResolver(LoginValidation),
		defaultValues: {
			first_name: oneCustomer.first_name,
			last_name: oneCustomer.last_name,
			city: oneCustomer.city
		},
		mode: 'onChange',
		reValidateMode: 'onChange'
	});

	const onSubmitEditCustomer = async (data: IEditCustomerInputs) => {
		try {
			await dispatch(updateCustomerByIdFunction({ idCustomer, formValues: data }));
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmitEditCustomer)} className="flex px-3 py-2 flex-col gap-y-3">
			<input type="text" placeholder="first name" className="rounded-md" {...register('first_name')} /> {/* First Name */}
			<input type="text" placeholder="last name" className="rounded-md" {...register('last_name')} /> {/* Last Name */}
			<input type="text" placeholder="city" className="rounded-md" {...register('city')} /> {/* City */}
			<button type="submit" className="max-w-fit px-12 py-2 bg-[#2563EB] text-white rounded-md mx-auto">
				Update Now
			</button>
		</form>
	);
};

export default UpdateForm;
