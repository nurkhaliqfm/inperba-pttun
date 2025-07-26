import SidangImage from "@/assets/img/sidang.svg";
import { OTPFieldConfig } from "@/constant/public";
import { generateZodSchema } from "@/utils/getZodScheme";
import { Button, Form, Image, Input } from "@heroui/react";
import { useState } from "react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { HiPhone, HiShieldCheck } from "react-icons/hi2";
import { getOTPAccess } from "../service/publicService";
import { toast } from "react-toastify";
import BlockInvalidInputChar from "@/utils/blockInvalidInput";
import AppRoutes from "@/router/routes";
import { WaPhoneConverter } from "@/utils/waPhoneConverter";

const PublicHomePage = () => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);

	const formZodSchema = generateZodSchema(OTPFieldConfig);

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

		const { phone } = values;

		getOTPAccess({
			phone: WaPhoneConverter(phone as string),
			onDone: (data) => {
				if (data.status === 201) {
					toast.success(data.message, {
						autoClose: 1000,
						onClose: () => {
							navigate(AppRoutes.PublicValidateTokenHome.path);
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

				<Form
					className="my-10 flex-row justify-center items-baseline"
					onSubmit={handleSubmit(onSubmit)}>
					{OTPFieldConfig.map((ff) => {
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
								label={`Masukkan ${ff.label}`}
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
							startContent={!isLoading && <HiShieldCheck />}
							className="mt-4"
							color="success"
							size="lg"
							type="submit">
							Kirim OTP
						</Button>
					</div>
				</Form>

				<section className="flex justify-center">
					<div className="grid grid-cols-2 gap-16">
						<section className="flex flex-col gap-y-2 items-center text-public-secondary">
							<p className="font-bold text-4xl">22</p>
							<div className="h-0.5 w-6 bg-public-accent"></div>
							<p className="text-xs font-thin">Perkara Terdaftar</p>
						</section>
						<section className="flex flex-col gap-y-2 items-center text-public-secondary">
							<p className="font-bold text-4xl">16</p>
							<div className="h-0.5 w-6 bg-public-accent"></div>
							<p className="text-xs font-thin">Perkara Putus</p>
						</section>
						<section className="flex flex-col gap-y-2 items-center text-public-secondary">
							<p className="font-bold text-4xl">22</p>
							<div className="h-0.5 w-6 bg-public-accent"></div>
							<p className="text-xs font-thin">Sisa Perkara</p>
						</section>
						<section className="flex flex-col gap-y-2 items-center text-public-secondary">
							<p className="font-bold text-4xl">72.73%</p>
							<div className="h-0.5 w-6 bg-public-accent"></div>
							<p className="text-xs font-thin">Rasio Perkara</p>
						</section>
					</div>
				</section>
			</section>

			<aside className="flex flex-col max-w-[24rem] mx-auto">
				<Image src={SidangImage} isZoomed loading="lazy" />
				<p className="text-public-secondary text-center font-thin">
					Kini, Anda tak perlu lagi menunggu dalam ketidakpastian.{" "}
					<b>INPERBA</b> hadir sebagai solusi modern untuk memantau status dan
					jadwal putusan perkara banding di PTTUN Makassar.{" "}
					<b>Cepat diakses, akurat, dan transparan</b> —{" "}
					<i>
						INPERBA mendekatkan keadilan kepada semua pihak yang membutuhkan.
					</i>
				</p>
			</aside>
		</section>
	);
};

export default PublicHomePage;
