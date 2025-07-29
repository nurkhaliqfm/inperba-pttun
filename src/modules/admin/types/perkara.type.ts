export interface PerkaraDetailResponse {
	id?: number;
	jenis_perkara: string;
	kontak_wa: string;
	nomor_perkara: string;
	pembading: string;
	terbanding: string;
	status_hari_sidang: boolean;
	status_penetapan_majelis: boolean;
	status_penetapan_sidang: boolean;
	status_penunjukan_panitera: boolean;
	status_proses: string;
	tanggal_hari_sidang: Date;
	tanggal_penetapan_majelis: Date;
	tanggal_penetapan_sidang: Date;
	tanggal_penunjukan_panitera: Date;
	tanggal_registrasi: Date;
}

export interface PerkaraRequest {
	kontak_wa: string;
	nomor_perkara: string;
	tanggal_registrasi: Date;
	jenis_perkara: string;
	pembading: string;
	terbanding: string;
	tanggal_hari_sidang: Date | null;
	status_proses: string;
}

export interface PerkaraResponse {
	perkara: PerkaraDetailResponse[];
	total: number;
	pages: { total: number; start: number; end: number; current: number };
}
