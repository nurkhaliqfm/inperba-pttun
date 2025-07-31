export const PerkaraFieldConfig = [
	{
		name: "kontak_wa",
		label: "Kontak Person (WA)",
		type: "phone",
		required: true,
	},
	{
		name: "nomor_perkara",
		label: "Nomor Perkara",
		type: "textnospace",
		required: true,
	},
	{
		name: "tanggal_registrasi",
		label: "Tanggal Registrasi",
		type: "date",
		required: true,
	},
	{
		name: "jenis_perkara",
		label: "Jenis Perkara",
		type: "select",
		required: true,
	},
	{
		name: "pembading",
		label: "Nama Pembanding",
		type: "text",
		required: true,
	},
	{
		name: "terbanding",
		label: "Nama Terbanding",
		type: "text",
		required: true,
	},
	{
		name: "tanggal_hari_sidang",
		label: "Tanggal Sidang",
		type: "date",
		required: false,
	},
	{
		name: "amar_putusan",
		label: "Amar Putusan",
		type: "textarea",
		required: true,
	},
	{
		name: "status_proses",
		label: "Status Proses",
		type: "select",
		required: true,
	},
];

export const jenisPerkaraOptions = [{ id: 1, nama: "Lain-Lain" }];
export const statusPerkaraOptions = [
	{ id: 1, nama: "PROSES" },
	{ id: 2, nama: "PUTUS" },
	{ id: 3, nama: "BANDING" },
	{ id: 4, nama: "KASASI" },
	{ id: 5, nama: "INKRAH" },
	{ id: 6, nama: "DICABUT" },
	{ id: 7, nama: "TIDAK DAPAT DITERIMA" },
	{ id: 8, nama: "DITOLAK" },
	{ id: 9, nama: "DIKABULKAN" },
	{ id: 10, nama: "MENUNGGU JADWAL SIDANG" },
	{ id: 11, nama: "ARSIP" },
];
