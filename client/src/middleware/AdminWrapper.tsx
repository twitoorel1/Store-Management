import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/hooks/useRedux';

interface IAdminWrapperProps {
	children: React.ReactNode;
}

const AdminWrapper: React.FC<IAdminWrapperProps> = ({ children }) => {
	const navigate = useNavigate();
	const { user } = useAppSelector(state => state.auth);

	useEffect(() => {
		if (user?.role !== 'admin') {
			navigate('/403');
			return;
		}
	}, [user?.role, navigate]);

	return <>{children}</>;
};

export default AdminWrapper;
