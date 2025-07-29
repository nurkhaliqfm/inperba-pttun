import { Button, Card, CardBody, CardFooter, CardHeader } from "@heroui/react";
import { useLocation, useParams } from "react-router-dom";
import { AnggotaDetailTransaksiResponse } from "../types/perkara.type";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useEffect, useState } from "react";
import { AnggotaItemKey } from "@/types/anggota";
import { anggotaBaseFieldConfig, anggotaFieldConfig } from "@/constants/user";
import {
	getAnggotaDocument,
	getAnggotaTransaksiDetail,
} from "../services/anggotaService";
import { AnggotaDetailItem } from "../components/AnggotaDetail";
import { HiOutlineArchiveBoxArrowDown } from "react-icons/hi2";
import AnggotaTransaksiTable from "../components/TransaksiAnggotaTable";
import { toast } from "react-toastify";
import { downloadBebasPustaka } from "@/shared/utils/downloadBebasPustaka";
import dayjs from "dayjs";

const DetailAnggotaPage = () => {
	const { group } = useParams<{ group: AnggotaItemKey }>();
	const { search } = useLocation();

	const params = new URLSearchParams(search);
	const anggota = params.get("anggota");

	const user = useTypedSelector((state) => state.oauth.oauthData);
	const [anggotaTransaksiDetailData, setAnggotaTransaksiDetailData] =
		useState<AnggotaDetailTransaksiResponse | null>(null);
	const [isLoadingDownload, setIsLoadingDownload] = useState<boolean>(false);

	useEffect(() => {
		if (group && anggota) {
			getAnggotaTransaksiDetail({
				token: user?.access_token,
				type: group,
				anggota: anggota,
				onDone: (data) => {
					setAnggotaTransaksiDetailData(data);
				},
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [anggota, group]);

	if (!anggotaTransaksiDetailData) return <p></p>;

	const detailKey = group ? (group as keyof typeof anggotaFieldConfig) : null;

	const formFields = [
		...anggotaBaseFieldConfig,
		...(detailKey
			? anggotaFieldConfig[detailKey].map((field) => ({
					...field,
			  }))
			: []),
	];
	const detailData = detailKey && anggotaTransaksiDetailData[detailKey];

	const handleDocumentDownload = (id_user: number) => {
		setIsLoadingDownload(true);
		if (group && detailData) {
			getAnggotaDocument({
				token: user?.access_token,
				type: group,
				anggota: String(id_user),
				onDone: (response) => {
					if (response.status === 200) {
						toast.success(response.message, {
							autoClose: 1000,
							onClose: () => {
								downloadBebasPustaka({
									file: response.data as string,
									name: `Kartu Bebas Pustaka (${detailData.nama}) - ${dayjs(
										new Date()
									).format("DD-MM-YYYY")}.pdf`,
								});
								window.location.reload();
								setIsLoadingDownload(false);
							},
						});
					} else {
						toast.error(response.message, {
							theme: "colored",
							autoClose: 1000,
							onClose: () => {
								setIsLoadingDownload(false);
							},
						});
					}
				},
				onError: (error) => {
					if (error.status === 406) {
						toast.info(error.error, {
							theme: "colored",
							onClose: () => {
								setIsLoadingDownload(false);
							},
						});
					} else {
						toast.error(error.error, {
							theme: "colored",
							autoClose: 1000,
							onClose: () => {
								setIsLoadingDownload(false);
							},
						});
					}
				},
			});
		}
	};

	return (
		<>
			{detailData && (
				<section className="flex gap-4 p-4 flex-col">
					<Card className="py-4 flex-1 border rounded-2xl h-fit" shadow="none">
						<CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
							<p className="text-tiny uppercase font-bold">Detail Anggota</p>
						</CardHeader>
						<CardBody className="overflow-visible py-2 px-4">
							{formFields.map((field) => {
								return (
									<AnggotaDetailItem
										key={field.name}
										slug={field.name}
										title={field.label}
										value={
											field.name === "fullname"
												? detailData.nama
												: field.name === "jenis_kelamin"
												? detailData.jenis_kelamin === "L"
													? "Laki-Laki"
													: "Perempuan"
												: field.name === "prodi"
												? ("prodi" in detailData && detailData.prodi?.nama) ||
												  ""
												: String(
														detailData[field.name as keyof typeof detailData] ??
															""
												  )
										}
									/>
								);
							})}
						</CardBody>
						{group === "mahasiswa" && (
							<CardFooter>
								<Button
									size="sm"
									variant="shadow"
									color="primary"
									className="mb-2"
									isLoading={isLoadingDownload}
									spinner={
										<svg
											className="animate-spin h-5 w-5 text-current"
											fill="none"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg">
											<circle
												className="opacity-25"
												cx="12"
												cy="12"
												r="10"
												stroke="currentColor"
												strokeWidth="4"
											/>
											<path
												className="opacity-75"
												d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
												fill="currentColor"
											/>
										</svg>
									}
									onPress={() =>
										handleDocumentDownload(anggotaTransaksiDetailData.id)
									}
									startContent={<HiOutlineArchiveBoxArrowDown />}>
									Cetak Bebas Pustaka
								</Button>
							</CardFooter>
						)}
					</Card>
					<Card className="py-4 flex-1 border rounded-2xl h-fit" shadow="none">
						<CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
							<p className="text-tiny uppercase font-bold">
								Daftar Pinjaman Anggota
							</p>
						</CardHeader>
						<CardBody className="overflow-visible py-2 px-4">
							<AnggotaTransaksiTable
								transaksi={anggotaTransaksiDetailData.transaksi}
							/>
						</CardBody>
					</Card>
				</section>
			)}
		</>
	);
};

export default DetailAnggotaPage;
