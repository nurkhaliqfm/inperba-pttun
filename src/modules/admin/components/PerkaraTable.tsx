import {
	cn,
	Input,
	Pagination,
	Spinner,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from "@heroui/react";
import { useCallback, useEffect, useMemo, useState, type Key } from "react";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

import useDebounce from "@/hooks/useDebounce";
import type {
	PerkaraDetailResponse,
	PerkaraResponse,
} from "../types/perkara.type";
import type { TableHeaderComponent } from "@/types/global";
import type { SetURLSearchParams } from "react-router-dom";
import dayjs from "dayjs";

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
	const [isLoadingData, setIsLoadingData] = useState<boolean>(false);
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
			<div className="flex flex-col gap-4 px-4 my-2">
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

				default:
					return String(cellValue ?? "");
			}
		},
		[]
	);

	return (
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
	);
}
