import axios, { AxiosError } from "axios";
import type { ApiError, ApiResponse } from "@/types/global";
import { UAParser } from "ua-parser-js";
import type { StatistikPerkaraResponse } from "../types/public.type";

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
	const userDevice = new UAParser();
	const signature = userDevice.getResult();
	const today = new Date();
	const identity = btoa(
		`${phone}$_^${VITE_IDENTITY_HASH}$_^${signature.ua}^:${today.getTime()}`
	);

	try {
		const response = await axios.post(`${VITE_SERVER_BASE_URL}/otp/create`, {
			phone: phone,
			identity: identity,
		});

		if (onDone)
			onDone({
				status: response.status,
				message: response.data.message || "OTP code send successfully",
				data: {
					phone: phone,
					identity: identity,
					isValidate: false,
				},
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

const getOTPValidation = async ({
	phone,
	otp,
	identity,
	onDone,
	onError,
}: {
	phone: string;
	otp: string;
	identity: string;
	onDone?: (data: ApiResponse) => void | undefined;
	onError?: (data: ApiError) => void | undefined;
}) => {
	try {
		const response = await axios.post(`${VITE_SERVER_BASE_URL}/otp/validate`, {
			phone: phone,
			identity: identity,
			otp: otp,
		});

		if (onDone)
			onDone({
				status: response.status,
				message: response.data.message || "OTP code validate successfully",
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
	identity,
	onDone,
	onError,
}: {
	perkara: string;
	identity: string;
	onDone?: (data: ApiResponse) => void | undefined;
	onError?: (data: ApiError) => void | undefined;
}) => {
	try {
		const response = await axios.get(
			`${VITE_SERVER_BASE_URL}/public/perkara-detail?perkara=${perkara}`,
			{
				headers: {
					Authorization: `${identity}`,
				},
			}
		);

		if (onDone)
			onDone({
				status: response.status,
				message:
					response.data.message || "Data Perkara Banding found successfully",
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

const getStatistikPerkara = async ({
	onDone,
	onError,
}: {
	onDone?: (data: StatistikPerkaraResponse) => void | undefined;
	onError?: (data: ApiError) => void | undefined;
}) => {
	try {
		const response = await axios.get(
			`${VITE_SERVER_BASE_URL}/public/perkara-statistik`
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
	getOTPAccess,
	getOTPValidation,
	getDetailPerkara,
	getStatistikPerkara,
};
