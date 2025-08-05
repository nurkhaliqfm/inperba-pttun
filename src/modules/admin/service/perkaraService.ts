import axios, { AxiosError } from "axios";
import type { ApiError, ApiResponse } from "@/types/global";
import type {
	PerkaraDetailResponse,
	PerkaraRequest,
	PerkaraResponse,
} from "../types/perkara.type";
import axiosPrivate from "@/utils/axiosPrivate";

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
		const response = await axiosPrivate.get(
			`${VITE_SERVER_BASE_URL}/admin/perkaras?page=${page}${
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

const createPerkara = async ({
	perkara,
	onDone,
	onError,
}: {
	perkara: PerkaraRequest;
	onDone?: (data: ApiResponse) => void | undefined;
	onError?: (data: ApiError) => void | undefined;
}) => {
	try {
		const response = await axiosPrivate.post(
			`${VITE_SERVER_BASE_URL}/admin/perkara/create`,
			{ data: perkara }
		);

		if (onDone)
			onDone({
				status: response.status,
				message:
					response.data.message || "Perkara Information created successfully",
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

const deletePerkara = async ({
	perkara,
	onDone,
	onError,
}: {
	perkara: number;
	onDone?: (data: ApiResponse) => void | undefined;
	onError?: (data: ApiError) => void | undefined;
}) => {
	try {
		const response = await axiosPrivate.get(
			`${VITE_SERVER_BASE_URL}/admin/perkara/delete?perkara=${perkara}`
		);

		if (onDone)
			onDone({
				status: response.status,
				message:
					response.data.message || "Perkara information deleted successfully",
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

const updatePerkara = async ({
	perkara,
	data,
	onDone,
	onError,
}: {
	perkara: number;
	data: PerkaraRequest;
	onDone?: (data: ApiResponse) => void | undefined;
	onError?: (data: ApiError) => void | undefined;
}) => {
	try {
		const response = await axiosPrivate.patch(
			`${VITE_SERVER_BASE_URL}/admin/perkara/update?perkara=${perkara}`,
			{ data: data }
		);

		if (onDone)
			onDone({
				status: response.status,
				message:
					response.data.message || "Perkara Information update successfully",
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

const getDetailPerkara = async ({
	perkara,
	onDone,
	onError,
}: {
	perkara: string;
	onDone?: (data: PerkaraDetailResponse) => void | undefined;
	onError?: (data: ApiError) => void | undefined;
}) => {
	try {
		const response = await axiosPrivate.get(
			`${VITE_SERVER_BASE_URL}/admin/perkara-detail?perkara=${perkara}`,
			{}
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

export {
	createPerkara,
	deletePerkara,
	updatePerkara,
	getDetailPerkara,
	getListPerkaraPagination,
};
