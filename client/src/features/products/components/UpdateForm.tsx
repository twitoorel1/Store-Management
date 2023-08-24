import { FC } from 'react';
import { RootState } from '../../../redux/store';
import { IEditProductInputs } from '../../../types/productTypes';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';

import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
import { updateProductById } from '../redux/productSlice';

const UpdateForm: FC<any> = ({ idProduct }) => {
	const dispatch = useAppDispatch();
	const { oneProduct, isError, isLoading } = useAppSelector((state: RootState) => state.product);

	const {
		register,
		handleSubmit
		// formState: { errors }
	} = useForm<IEditProductInputs>({
		// resolver: yupResolver(LoginValidation),
		defaultValues: {
			name: oneProduct.name,
			price: oneProduct.price,
			quantity: oneProduct.quantity
		},
		mode: 'onChange',
		reValidateMode: 'onChange'
	});

	const onSubmitEditProduct = async (data: IEditProductInputs) => {
		try {
			await dispatch(updateProductById({ idProduct, formValues: data }));
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmitEditProduct)} className="flex px-3 py-2 flex-col gap-y-3">
			<input type="text" placeholder="Name" className="rounded-md" {...register('name')} />
			<input type="number" placeholder="Price" className="rounded-md" {...register('price')} />
			<input type="number" placeholder="Quantity" className="rounded-md" {...register('quantity')} />
			<button type="submit" className="max-w-fit px-12 py-2 bg-[#2563EB] text-white rounded-md mx-auto">
				Update Now
			</button>
		</form>
	);
};

export default UpdateForm;
