import { createContext, useContext, useMemo } from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { RootState } from '@/redux/store';
import { ICustomerState } from '@/types/customerTypes';
import { LayoutProps } from '@/types/global';

// interface CustomerContextValues {}

const CustomerContext = createContext<ICustomerState | null>(null);

export const UseCustomerContext = () => useContext(CustomerContext);

export function CustomerProvider({ children }: LayoutProps) {
	const dispatch = useAppDispatch();
	const {} = useAppSelector((state: RootState) => state.customer);

	const customerContextValue = useMemo({}, []);
    return (
        <CustomerContext.Provider value={customerContextValue}>
            {children}
        </CustomerContext.Provider>
    );
}
