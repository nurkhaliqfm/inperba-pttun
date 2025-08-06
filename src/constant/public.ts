import type { StatistikPerkaraResponse } from "@/modules/public/types/public.type";

export const OTPFieldConfig = [
	{
		name: "phone",
		label: "Nomor HP",
		type: "phone",
		required: true,
	},
];

export const ValidationOTPFieldConfig = [
	{ name: "otp", label: "Kode OTP", type: "otp", required: true },
];

export const SearchPerkaraFieldConfig = [
	{
		name: "perkara",
		label: "Nomor Perkara",
		type: "text",
		required: true,
	},
];

export const ItemStatistik = [
	{
		name: "Perkara Terdaftar",
		key: "perkara" as keyof StatistikPerkaraResponse,
	},
	{ name: "Perkara Putus", key: "putus" as keyof StatistikPerkaraResponse },
	{ name: "Sisa Perkara", key: "sisa" as keyof StatistikPerkaraResponse },
	{
		name: "Rasio Perkara",
		key: "persentase" as keyof StatistikPerkaraResponse,
	},
];
