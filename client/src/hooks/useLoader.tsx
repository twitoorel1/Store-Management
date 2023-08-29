import { useState, useEffect } from 'react';

const useLoader = (delay: number = 0) => {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => setIsLoading(false), delay);

		return () => clearTimeout(timer);
	}, [delay]);

	return isLoading;
};

export default useLoader;
