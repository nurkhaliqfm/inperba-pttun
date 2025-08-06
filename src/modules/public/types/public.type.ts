export interface OTPAccessResponse {
	otp: string;
}

export interface OTPAccessRequest {
	phone: string;
}

export interface StatistikPerkaraResponse {
	perkara: number;
	putus: number;
	sisa: number;
	persentase: string;
}
