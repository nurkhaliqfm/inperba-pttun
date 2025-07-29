import {
	jenisPerkaraOptions,
	PerkaraFieldConfig,
	statusPerkaraOptions,
} from "@/constant/perkara";
import BlockInvalidInputChar from "@/utils/blockInvalidInput";
import { generateZodSchema } from "@/utils/getZodScheme";
import {
	Button,
	DatePicker,
	Form,
	Input,
	Select,
	SelectItem,
	type DateValue,
} from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { HiMiniPlus, HiPhone } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import type z from "zod";
import { createPerkara } from "../service/perkaraService";
import { toast } from "react-toastify";
import AppRoutes from "@/router/routes";
import type { PerkaraRequest } from "../types/perkara.type";

const CreatePerkaraAdminPage = () => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);

	const formZodSchema = generateZodSchema(PerkaraFieldConfig);

	const {
		control,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<z.infer<typeof formZodSchema>>({
		resolver: zodResolver(formZodSchema),
		defaultValues: {},
	});

	function onSubmit(values: z.infer<typeof formZodSchema>) {
		// setIsLoading(true);

		const { jenis_perkara, status_proses, tanggal_hari_sidang, ...data } =
			values;
		const jenisPerkara = jenisPerkaraOptions.find(
			(item) => item.id === Number(jenis_perkara)
		)?.nama;

		const prosesPerkara = statusPerkaraOptions.find(
			(item) => item.id === Number(status_proses)
		)?.nama;

		const perkaraDataCreate = {
			jenis_perkara: jenisPerkara,
			status_proses: prosesPerkara,
			tanggal_hari_sidang: tanggal_hari_sidang || null,
			...data,
		} as PerkaraRequest;

		createPerkara({
			perkara: {
				...perkaraDataCreate,
				kontak_wa: `62${perkaraDataCreate.kontak_wa}`,
			},
			onDone: (data) => {
				if (data.status === 201) {
					toast.success(data.message, {
						autoClose: 1000,
						onClose: () => {
							navigate(AppRoutes.AdminDashboard.path);
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

	return (
		<main>
			<p className="text-public-secondary text-3xl text-center">
				Membuat Informasi Perkara Baru
			</p>
			<Form
				className="my-10 justify-center items-center"
				onSubmit={handleSubmit(onSubmit)}>
				{PerkaraFieldConfig.map((ff) => {
					const name = ff.name as keyof z.infer<typeof formZodSchema>;
					return name === "kontak_wa" ? (
						<Input
							key={name}
							{...register(name)}
							isRequired={ff.required}
							className="max-w-lg"
							variant="flat"
							isClearable
							labelPlacement="inside"
							label={ff.label}
							type="number"
							onKeyDown={BlockInvalidInputChar}
							startContent={
								<p className="flex justify-center items-center gap-2">
									<HiPhone className="pointer-events-none shrink-0" />
									<span className="text-medium">+62</span>
								</p>
							}
							size="lg"
							errorMessage={errors[name]?.message}
							isInvalid={!!errors[name]?.message}
						/>
					) : name === "tanggal_registrasi" ||
					  name === "tanggal_hari_sidang" ? (
						<Controller
							key={name}
							name={name}
							control={control}
							rules={{ required: ff.required }}
							render={({ field }) => (
								<DatePicker
									value={field.value as DateValue}
									onChange={field.onChange}
									onBlur={field.onBlur}
									isRequired={ff.required}
									className="max-w-lg"
									label={ff.label}
									errorMessage={errors[name]?.message}
									isInvalid={!!errors[name]?.message}
								/>
							)}
						/>
					) : name === "jenis_perkara" || name === "status_proses" ? (
						<Select
							key={name}
							{...register(name)}
							isRequired={ff.required}
							className="max-w-lg"
							variant="flat"
							items={
								name === "jenis_perkara"
									? jenisPerkaraOptions
									: statusPerkaraOptions
							}
							label={ff.label}
							placeholder={`Pilih ${ff.label}`}>
							{(item) => <SelectItem key={item.id}>{item.nama}</SelectItem>}
						</Select>
					) : (
						<Input
							key={name}
							{...register(name)}
							isRequired={ff.required}
							className="max-w-lg"
							variant="flat"
							isClearable
							labelPlacement="inside"
							type="text"
							label={ff.label}
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
						startContent={!isLoading && <HiMiniPlus />}
						className="mt-4"
						color="success"
						size="lg"
						type="submit">
						Simpan Perkara
					</Button>
				</div>
			</Form>
		</main>
	);
};

export default CreatePerkaraAdminPage;
