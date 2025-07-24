import axios, { AxiosError } from "axios";
import type { ApiError, ApiResponse } from "@/types/global";

const { VITE_SERVER_BASE_URL } = import.meta.env;

const getOTPAccess = async ({
	phone,
	onDone,
	onError,
}: {
	phone: string;
	onDone?: (data: ApiResponse) => void | undefined;
	onError?: (data: ApiError) => void | undefined;
}) => {
	try {
		const response = {
			data: {
				otp: phone,
				message: "",
			},
			url: VITE_SERVER_BASE_URL,
			status: 200,
		};
		// const response = await axiosClient.get(
		// 	`${baseUrl}/${type}s?page=${page}${keyword ? `&keyword=${keyword}` : ""}${
		// 		limit ? `&limit=${limit}` : ""
		// 	}`,
		// 	{
		// 		headers: {
		// 			Authorization: `Bearer ${token}`,
		// 		},
		// 	}
		// );

		if (onDone)
			onDone({
				status: response.status,
				message: response.data.message || "OTP code send successfully",
				data: response.data.otp,
			});
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

export { getOTPAccess };
