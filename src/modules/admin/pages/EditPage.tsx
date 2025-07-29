import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTypedSelector } from "@/hooks/useTypedSelector";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { generateZodSchema } from "@/shared/utils/getZodScheme";
import { Button } from "@heroui/react";
import { HiChevronRight } from "react-icons/hi2";
import { toast } from "react-toastify";
import AppRoutes from "@/router/routes";
import { AnggotaItemKey } from "@/types/anggota";
import { AnggotaDetailResponse, AnggotaRequest } from "../types/perkara.type";
import {
	anggotaBaseFieldConfig,
	anggotaFieldConfig,
	anggotaFormSelectOptios,
} from "@/constants/user";
import { getAnggotaDetail, updateAnggota } from "../services/anggotaService";
import BlockInvalidInputChar from "@/utils/blockInvalidInput";

const EditAnggotaPage = () => {
	const { group } = useParams<{ group: AnggotaItemKey }>();
	const { search } = useLocation();
	const navigate = useNavigate();

	const params = new URLSearchParams(search);
	const anggota = params.get("anggota");

	const user = useTypedSelector((state) => state.oauth.oauthData);
	const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
	const [anggotaDetailData, setanggotaDetailData] =
		useState<AnggotaDetailResponse | null>(null);

	const detailKey = group ? (group as keyof typeof anggotaFieldConfig) : null;

	const formFields = [
		...anggotaBaseFieldConfig,
		...(detailKey
			? anggotaFieldConfig[detailKey].map((field) => ({
					...field,
					type: field.type as "number" | "textarea" | "text" | "select",
					name: field.name as keyof z.infer<typeof formZodSchema>,
			  }))
			: []),
	];

	const formZodSchema = detailKey
		? generateZodSchema([
				...anggotaBaseFieldConfig.map((field) => ({
					...field,
					type: field.type,
					name: field.name,
				})),
				...anggotaFieldConfig[detailKey],
		  ])
		: z.object({});

	const form = useForm<z.infer<typeof formZodSchema>>({
		resolver: zodResolver(formZodSchema),
		defaultValues: {
			...(anggotaDetailData && detailKey ? anggotaDetailData[detailKey] : {}),
		},
	});
	function onSubmit(values: z.infer<typeof formZodSchema>) {
		setIsLoadingUpdate(true);

		if (!anggotaDetailData) return "No anggota data available.";
		const { fullname, ...anggotaData } = values as AnggotaRequest;

		updateAnggota({
			token: user?.access_token,
			atr: { id: anggota, slug: group },
			anggota: {
				fullname: fullname,
				email: null,
				[group as string]: {
					...anggotaData,
					nama: fullname,
				},
			},
			onDone: (data) => {
				if (data.status === 200) {
					toast.success(data.message, {
						autoClose: 1000,
						onClose: () => {
							navigate(
								AppRoutes.AdminAnggota.path.replace(":group", group || "")
							);
						},
					});
				} else {
					toast.error(data.message, {
						theme: "colored",
						autoClose: 1000,
						onClose: () => {
							setIsLoadingUpdate(false);
						},
					});
				}
			},
			onError: (error) => {
				toast.error(error.error, {
					theme: "colored",
					autoClose: 1000,
					onClose: () => {
						setIsLoadingUpdate(false);
					},
				});
			},
		});
	}

	useEffect(() => {
		if (group && anggota) {
			getAnggotaDetail({
				token: user?.access_token,
				type: group,
				anggota: anggota,
				onDone: (data) => {
					setanggotaDetailData(data);
					if (formZodSchema) {
						form.reset({
							...(data[group] as unknown as z.infer<typeof formZodSchema>),
							fullname: data[group]?.nama,
							jenis_kelamin:
								data[group]?.jenis_kelamin === "L"
									? { id: 1, nama: "Laki-Laki" }
									: { id: 2, nama: "Perempuan" },
						});
					}
				},
				onError: (error) => {
					toast.error(error.error, {
						theme: "colored",
						autoClose: 1000,
					});
					setIsLoadingUpdate(false);
				},
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [anggota, group]);

	if (!anggotaDetailData) return <p>No data found.</p>;

	return (
		<div className="p-4">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
					{formFields.map((ff) => {
						return (
							<FormField
								key={ff.name}
								control={form.control}
								name={ff.name as keyof z.infer<typeof formZodSchema>}
								render={({ field }) => (
									<FormItem>
										<FormLabel>{ff.label}</FormLabel>
										<FormControl>
											{ff.type === "select" ? (
												<>
													<Select
														onValueChange={(value) => {
															const selectedOptions = anggotaFormSelectOptios[
																ff.name as keyof typeof anggotaFormSelectOptios
															].find((item) => item.id === Number(value));

															field.onChange(selectedOptions || null);
														}}
														value={
															field.value && typeof field.value === "object"
																? String((field.value as { id: number }).id)
																: undefined
														}>
														<SelectTrigger>
															<SelectValue placeholder={`Pilih ${ff.label}`} />
														</SelectTrigger>
														<SelectContent>
															{anggotaFormSelectOptios[
																ff.name as keyof typeof anggotaFormSelectOptios
															].map((item) => (
																<SelectItem
																	key={item.id}
																	value={String(item.id)}>
																	{item.nama}
																</SelectItem>
															))}
														</SelectContent>
													</Select>
												</>
											) : ff.type === "textarea" ? (
												<Textarea
													placeholder={`Masukkan ${ff.label}`}
													{...field}
													rows={5}
													value={(field.value as typeof field.value) ?? ""}
												/>
											) : ff.type === "number" ? (
												<Input
													placeholder={`Masukkan ${ff.label}`}
													{...field}
													type="number"
													min={0}
													onKeyDown={BlockInvalidInputChar}
													onChange={(e) => {
														const value = e.target.value;
														if (value === "") {
															field.onChange(null);
														} else {
															field.onChange(Number(value));
														}
													}}
												/>
											) : (
												<Input
													placeholder={`Masukkan ${ff.label}`}
													{...field}
													type={ff.type}
													value={(field.value as typeof field.value) ?? ""}
												/>
											)}
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						);
					})}
					<div className="flex justify-end">
						<Button
							isLoading={isLoadingUpdate}
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
							endContent={<HiChevronRight />}
							className="mt-4"
							color="primary"
							type="submit">
							Update Anggota
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
};

export default EditAnggotaPage;
