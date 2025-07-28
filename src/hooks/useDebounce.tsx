import { useEffect, useState } from "react";

const useDebounce = (value: string, delay: number = 1000) => {
	const [debounceValue, setDebounceValue] = useState<string>(value);

	useEffect(() => {
		const handler = setTimeout(() => setDebounceValue(value), delay);

		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]);

	return debounceValue;
};

export default useDebounce;
