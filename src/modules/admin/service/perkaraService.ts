import axios, { AxiosError } from "axios";
import type { ApiError } from "@/types/global";
import type { PerkaraResponse } from "../types/perkara.type";

const { VITE_SERVER_BASE_URL } = import.meta.env;

const getListPerkaraPagination = async ({
	page,
	keyword,
	limit,
	onDone,
	onError,
}: {
	page: string;
	keyword?: string;
	limit?: string;
	onDone?: (data: PerkaraResponse) => void | undefined;
	onError?: (data: ApiError) => void | undefined;
}) => {
	try {
		const response = await axios.get(
			`${VITE_SERVER_BASE_URL}/public/perkaras?page=${page}${
				keyword ? `&keyword=${keyword}` : ""
			}${limit ? `&limit=${limit}` : ""}`
		);

		if (onDone) onDone(response.data);
	} catch (error) {
		if (axios.isAxiosError(error)) {
			const axiosError = error as AxiosError<ApiError>;
			if (onError)
				onError({
					status: axiosError.response?.status || 500,
					error: axiosError.response?.data.error || axiosError.message,
				});
			if (axiosError.response?.status === 401) {
				localStorage.removeItem("authData");
				window.location.reload();
			}
		}
		throw error;
	}
};

export { getListPerkaraPagination };
