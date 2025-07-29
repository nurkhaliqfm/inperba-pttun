import {
	Button,
	cn,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Pagination,
	Spinner,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
	Tooltip,
	useDisclosure,
} from "@heroui/react";
import { useCallback, useEffect, useMemo, useState, type Key } from "react";
import {
	HiOutlineMagnifyingGlass,
	HiOutlinePencil,
	HiOutlineTrash,
} from "react-icons/hi2";

import useDebounce from "@/hooks/useDebounce";
import type {
	PerkaraDetailResponse,
	PerkaraResponse,
} from "../types/perkara.type";
import type { TableHeaderComponent } from "@/types/global";
import { useNavigate, type SetURLSearchParams } from "react-router-dom";
import dayjs from "dayjs";
import AppRoutes from "@/router/routes";
import { deletePerkara } from "../service/perkaraService";
import { toast } from "react-toastify";

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
	{ key: "actions", label: "ACTIONS" },
];

export function PerkaraTable({
	data,
	page,
	keyword,
	limit,
	setSearchParams,
}: {
	data: PerkaraResponse;
	page: number;
	keyword: string;
	limit: string;
	setSearchParams: SetURLSearchParams;
}) {
	const navigate = useNavigate();
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const [isLoadingData, setIsLoadingData] = useState<boolean>(false);
	const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false);
	const [deletedContent, setDeletedContent] =
		useState<PerkaraDetailResponse | null>(null);
	const [filterValue, setFilterValue] = useState<string>(keyword);
	const debounceValue = useDebounce(filterValue);

	const onSearchChange = (value: string) => {
		setIsLoadingData(true);
		setFilterValue(value);
	};

	const onClear = useCallback(() => {
		setFilterValue("");
	}, []);

	const onRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setFilterValue("");
		setSearchParams({
			page: "1",
			limit: e.target.value,
		});
	};

	useEffect(() => {
		setSearchParams({
			...(debounceValue &&
				debounceValue !== "" && { keyword: debounceValue.toString() }),
			page: "1",
			limit: limit,
		});

		setIsLoadingData(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debounceValue, limit]);

	const topContent = useMemo(() => {
		return (
			<div className="flex flex-col gap-4 my-2">
				<div className="flex justify-between gap-3 items-end">
					<Input
						isClearable
						className="w-full sm:max-w-[44%]"
						placeholder="Search perkara by nomor perkara..."
						startContent={<HiOutlineMagnifyingGlass />}
						value={filterValue}
						onClear={() => onClear()}
						onValueChange={onSearchChange}
					/>
				</div>
				<div className="flex justify-between items-center">
					<span className="text-default-400 text-small">
						Total {data.total} Perkara
					</span>
					<label className="flex items-center text-default-400 text-small">
						Rows per page:
						<select
							className="bg-transparent outline-none text-default-400 text-small"
							defaultValue={limit || "5"}
							onChange={onRowsPerPageChange}>
							<option value="5">5</option>
							<option value="10">10</option>
							<option value="15">15</option>
							<option value="20">20</option>
						</select>
					</label>
				</div>
			</div>
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filterValue, onSearchChange]);

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
				case "actions":
					return (
						<div className="relative flex items-center gap-2">
							<Tooltip content="Edit Perkara">
								<Button
									color="success"
									size="sm"
									onPress={() =>
										navigate(
											`${AppRoutes.AdminEditPerkara.path.replace(
												":slug",
												String(perkara.id)
											)}`
										)
									}
									isIconOnly
									startContent={<HiOutlinePencil />}
								/>
							</Tooltip>
							<Tooltip content="Delete Perkara">
								<Button
									color="danger"
									size="sm"
									onPress={() => {
										onOpen();
										setDeletedContent(perkara);
									}}
									isIconOnly
									startContent={<HiOutlineTrash />}
								/>
							</Tooltip>
						</div>
					);
				default:
					return String(cellValue ?? "");
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	return (
		<>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">
								Apakah anda yakin ingin menghapus perkara ini?
							</ModalHeader>
							<ModalBody>
								<p>
									Data perkara{" "}
									<span className="font-bold">
										{deletedContent?.nomor_perkara}
									</span>{" "}
									akan dihapus. Tindakan ini tidak dapat dibatalkan. Ini akan
									secara permanen menghapus data Anda dari server kami.
								</p>
							</ModalBody>
							<ModalFooter>
								<Button color="danger" variant="light" onPress={onClose}>
									Close
								</Button>
								<Button
									size="md"
									isLoading={isLoadingDelete}
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
									color="danger"
									variant="solid"
									onPress={() => {
										setIsLoadingDelete(true);
										deletePerkara({
											perkara: Number(deletedContent?.id),
											onDone: (data) => {
												if (data.status === 200) {
													toast.success(data.message, {
														autoClose: 1000,
														onClose: () => {
															window.location.reload();
															setIsLoadingDelete(false);
														},
													});
												} else {
													toast.error(data.message, {
														theme: "colored",
														autoClose: 1000,
														onClose: () => {
															setIsLoadingDelete(false);
														},
													});
												}
											},
											onError: (error) => {
												toast.error(error.error, {
													theme: "colored",
													autoClose: 1000,
													onClose: () => {
														setIsLoadingDelete(false);
													},
												});
											},
										});
									}}>
									Hapus
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>

			<Table
				className="gap-0"
				isHeaderSticky
				isStriped={true}
				shadow="none"
				aria-label="Data koleksi perpustakaan"
				topContent={topContent}
				topContentPlacement="outside"
				bottomContentPlacement="outside"
				bottomContent={
					<div className="flex w-full justify-center my-4">
						<Pagination
							isCompact
							showControls
							showShadow
							color="success"
							page={page}
							total={data.pages.total}
							onChange={(page) =>
								setSearchParams({
									page: page.toString(),
									keyword: filterValue,
									limit: limit,
								})
							}
						/>
					</div>
				}>
				<TableHeader columns={PerkaraHeaderTable}>
					{(column) => (
						<TableColumn key={column.key} align="start">
							{column.label}
						</TableColumn>
					)}
				</TableHeader>
				<TableBody
					isLoading={isLoadingData}
					loadingContent={
						<div className="bg-white rounded-xl shadow-md z-50">
							<Spinner className="m-4" label="Loading data..." />
						</div>
					}
					emptyContent={`Data Perkara tidak ditemukan `}
					items={data.perkara}
					className="overflow-y-scroll">
					{(item) => (
						<TableRow key={`anggota-item-${item.id}`}>
							{(columnKey) => (
								<TableCell>{renderCell(item, columnKey)}</TableCell>
							)}
						</TableRow>
					)}
				</TableBody>
			</Table>
		</>
	);
}
