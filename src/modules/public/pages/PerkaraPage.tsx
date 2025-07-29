import { SearchPerkaraFieldConfig } from "@/constant/public";
import { generateZodSchema } from "@/utils/getZodScheme";
import { Button, cn, Form, Input } from "@heroui/react";
import { useCallback, useEffect, useState, type Key } from "react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { HiMagnifyingGlass, HiOutlineDocumentText } from "react-icons/hi2";
import { getDetailPerkara } from "../service/publicService";
import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
} from "@heroui/table";

import { toast } from "react-toastify";
import { useSession } from "../store/useSession";
import { useNavigate } from "react-router-dom";
import AppRoutes from "@/router/routes";
import dayjs from "dayjs";
import "dayjs/locale/id";
import type { PerkaraDetailResponse } from "@/modules/admin/types/perkara.type";
import type { TableHeaderComponent } from "@/types/global";
dayjs.locale("id");

const PerkaraHeaderTable: TableHeaderComponent[] = [
	{
		key: "tanggal_registrasi",
		label: "TANGGAL PENDAFTARAN",
	},
	{
		key: "jenis_perkara",
		label: "JENIS PERKARA",
	},
	{
		key: "nomor_perkara",
		label: "NOMOR PERKARA",
	},
	{ key: "para_pihak", label: "PARA PIHAK" },
	{ key: "tanggal_hari_sidang", label: "SIDANG PUTUSAN" },
];

const PublicPerkaraPage = () => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [isPerkaraFound, setIsPerkaraFound] = useState(false);
	const [dataPerkara, setDataPerkara] =
		useState<PerkaraDetailResponse | null>();
	const session = useSession();
	const currentSessionOTP = session.data;

	const formZodSchema = generateZodSchema(SearchPerkaraFieldConfig);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<z.infer<typeof formZodSchema>>({
		resolver: zodResolver(formZodSchema),
		defaultValues: {},
	});

	function onSubmit(values: z.infer<typeof formZodSchema>) {
		setIsLoading(true);

		const { perkara } = values;

		if (currentSessionOTP) {
			getDetailPerkara({
				perkara: perkara as string,
				identity: currentSessionOTP.identity,
				onDone: (data) => {
					if (data.status === 200) {
						toast.success(data.message, {
							autoClose: 1000,
							onClose: () => {
								setIsPerkaraFound(true);
								setDataPerkara(data.data as PerkaraDetailResponse);
							},
						});
					} else {
						toast.error(data.message, {
							theme: "colored",
							autoClose: 1000,
							onClose: () => {
								setIsLoading(false);
							},
						});
					}
				},
				onError: (error) => {
					toast.error(error.error, {
						theme: "colored",
						autoClose: 1000,
						onClose: () => {
							setIsLoading(false);
						},
					});
				},
			});
		}
	}

	const renderCell = useCallback(
		(perkara: PerkaraDetailResponse, columnKey: Key) => {
			const cellValue = perkara[columnKey as keyof PerkaraDetailResponse];

			switch (columnKey) {
				case "tanggal_registrasi":
				case "tanggal_hari_sidang":
					return (
						<p
							className={cn(
								"text-sm capitalize whitespace-nowrap",
								cellValue ? "font-bold" : "font-light italic"
							)}>
							{cellValue
								? String(
										dayjs(new Date(cellValue as string)).format("DD MMMM YYYY")
								  )
								: "Belum Ditetapkan"}
						</p>
					);

				case "jenis_perkara":
				case "nomor_perkara":
					return (
						<div className="flex flex-col">
							<p className="text-bold text-sm capitalize">
								{String(cellValue)}
							</p>
						</div>
					);
				case "para_pihak":
					return (
						<div className="flex flex-col w-40">
							<div className="flex flex-col my-2">
								<p className="text-xs">Pembanding:</p>
								<p className="font-bold">{perkara.pembading}</p>
							</div>
							<div className="flex flex-col my-2">
								<p className="text-xs">Terbanding:</p>
								<p className="font-bold">{perkara.terbanding}</p>
							</div>
						</div>
					);

				default:
					return String(cellValue ?? "");
			}
		},
		[]
	);

	useEffect(() => {
		if (!currentSessionOTP) {
			const timer = setTimeout(() => {
				navigate(AppRoutes.PublicHome.path);
			}, 3000);

			return () => clearTimeout(timer);
		}
	}, [currentSessionOTP, navigate]);

	if (!currentSessionOTP || !currentSessionOTP.isValidate) {
		return (
			<p className="text-public-secondary text-2xl font-medium text-center mt-6">
				Redirect to OTP input phone number page ....
			</p>
		);
	}

	return (
		<section className="flex flex-col md:flex-row gap-4">
			<section className="flex-1">
				<header>
					<p className="text-public-secondary text-center text-xl font-bold">
						INFORMASI KAPAN PERKARA BANDING DIPUTUS
					</p>
					<p className="text-public-secondary text-center text-medium font-medium">
						PENGADILAN TINGGI TATA USAHA NEGARA MAKASSAR
					</p>
				</header>

				{!isPerkaraFound ? (
					<Form
						className="my-10 flex-row justify-center items-baseline"
						onSubmit={handleSubmit(onSubmit)}>
						{SearchPerkaraFieldConfig.map((ff) => {
							const name = ff.name as keyof z.infer<typeof formZodSchema>;
							return (
								<Input
									key={name}
									{...register(name)}
									className="max-w-xs"
									variant="flat"
									color="success"
									isClearable
									labelPlacement="outside"
									type="text"
									placeholder={`Masukkan ${ff.label}`}
									startContent={
										<p className="flex justify-center items-center gap-2">
											<HiOutlineDocumentText className="pointer-events-none shrink-0" />
										</p>
									}
									size="lg"
									errorMessage={errors[name]?.message}
									isInvalid={!!errors[name]?.message}
								/>
							);
						})}

						<div className="flex justify-end">
							<Button
								isLoading={isLoading}
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
								startContent={!isLoading && <HiMagnifyingGlass />}
								className="mt-4"
								color="success"
								size="lg"
								type="submit">
								Cari
							</Button>
						</div>
					</Form>
				) : (
					dataPerkara && (
						<Table
							className="my-10"
							aria-label="Table Data Perkara Banding Diputus"
							color="success">
							<TableHeader columns={PerkaraHeaderTable}>
								{(column) => (
									<TableColumn key={column.key}>{column.label}</TableColumn>
								)}
							</TableHeader>
							<TableBody items={[dataPerkara]}>
								{(item) => (
									<TableRow key={item.id}>
										{(columnKey) => (
											<TableCell>{renderCell(item, columnKey)}</TableCell>
										)}
									</TableRow>
								)}
							</TableBody>
						</Table>
					)
				)}
			</section>
		</section>
	);
};

export default PublicPerkaraPage;
