import axios, { AxiosError } from "axios";
import type { ApiError, ApiResponse } from "@/types/global";
import axiosPrivate from "@/utils/axiosPrivate";

const { VITE_SERVER_BASE_URL } = import.meta.env;

const connectWhatsapp = async ({
	phone,
	onDone,
	onError,
}: {
	phone: string;
	onDone?: (data: ApiResponse) => void | undefined;
	onError?: (data: ApiError) => void | undefined;
}) => {
	try {
		const response = await axiosPrivate.post(
			`${VITE_SERVER_BASE_URL}/admin/whatsapp/connect`,
			{
				phone: phone,
			}
		);

		if (onDone)
			onDone({
				status: response.status,
				message: response.data.message || "Whatsapp pairing successfully",
				data: response.data,
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

const diconnectWhatsapp = async ({
	phone,
	onDone,
	onError,
}: {
	phone: string;
	onDone?: (data: ApiResponse) => void | undefined;
	onError?: (data: ApiError) => void | undefined;
}) => {
	try {
		const response = await axiosPrivate.post(
			`${VITE_SERVER_BASE_URL}/admin/whatsapp/disconnect`,
			{
				phone: phone,
			}
		);

		if (onDone)
			onDone({
				status: response.status,
				message: response.data.message || "Whatsapp disconnected successfully",
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

const statusWhatsapp = async ({
	onDone,
	onError,
}: {
	onDone?: (data: ApiResponse) => void | undefined;
	onError?: (data: ApiError) => void | undefined;
}) => {
	try {
		const response = await axiosPrivate.get(
			`${VITE_SERVER_BASE_URL}/admin/whatsapp/status`
		);

		if (onDone)
			onDone({
				status: response.status,
				message: response.data.message || "Whatsapp status get successfully",
				data: response.data,
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

export { connectWhatsapp, diconnectWhatsapp, statusWhatsapp };
