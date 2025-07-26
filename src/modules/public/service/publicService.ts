import axios, { AxiosError } from "axios";
import type { ApiError, ApiResponse } from "@/types/global";

const { VITE_SERVER_BASE_URL, VITE_IDENTITY_HASH } = import.meta.env;

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
		const response = await axios.post(`${VITE_SERVER_BASE_URL}/otp/create`, {
			phone: phone,
			identity: btoa(`${phone}$_^${VITE_IDENTITY_HASH}`),
		});

		console.log(response);

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
