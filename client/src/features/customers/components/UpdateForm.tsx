import { useForm } from 'react-hook-form';
import { IEditCustomerInputs } from '@/types/customerTypes';

const UpdateForm = ({ oneCustomer, onSubmitFun }: { oneCustomer: any; onSubmitFun: any }) => {
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

	const onSubmitEditProduct = async (data: IEditCustomerInputs) => {
		try {
			await onSubmitFun(data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmitEditProduct)} className="flex px-3 py-2 flex-col gap-y-3">
			<input type="text" placeholder="first name" className="rounded-md" {...register('first_name')} />
			<input type="text" placeholder="last name" className="rounded-md" {...register('last_name')} />
			<input type="text" placeholder="city" className="rounded-md" {...register('city')} />
			<button type="submit" className="max-w-fit px-12 py-2 bg-[#2563EB] text-white rounded-md mx-auto">
				Update Now
			</button>
		</form>
	);
};

export default UpdateForm;
