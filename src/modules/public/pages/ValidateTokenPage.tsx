import { ValidationOTPFieldConfig } from "@/constant/public";
import { generateZodSchema } from "@/utils/getZodScheme";
import { Button, Form, InputOtp } from "@heroui/react";
import { useEffect, useState } from "react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { getOTPValidation } from "../service/publicService";
import { toast } from "react-toastify";
import BlockInvalidInputChar from "@/utils/blockInvalidInput";
import { BsShieldLockFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import AppRoutes from "@/router/routes";
import { useSession } from "../store/useSession";

const PublicValidateTokenPage = () => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const session = useSession();
	const currentSessionOTP = session.data;

	const formZodSchema = generateZodSchema(ValidationOTPFieldConfig);

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

		const { otp } = values;

		if (currentSessionOTP) {
			getOTPValidation({
				phone: currentSessionOTP.phone as string,
				otp: otp as string,
				identity: currentSessionOTP.identity,
				onDone: (data) => {
					if (data.status === 201) {
						toast.success(data.message, {
							autoClose: 1000,
							onClose: () => {
								session.validate(currentSessionOTP.identity);
								navigate(AppRoutes.PublicPerkara.path);
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

	useEffect(() => {
		if (!currentSessionOTP) {
			const timer = setTimeout(() => {
				navigate(AppRoutes.PublicHome.path);
			}, 3000);

			return () => clearTimeout(timer);
		}
	}, [currentSessionOTP, navigate]);

	if (!currentSessionOTP) {
		return (
			<p className="text-public-secondary text-2xl font-medium text-center mt-6">
				Redirect to OTP input phone number page ....
			</p>
		);
	} else if (currentSessionOTP && currentSessionOTP.isValidate) {
		return (
			<p className="text-public-secondary text-2xl font-medium text-center mt-6">
				Redirect to daftar perkara page ....
			</p>
		);
	}

	return (
		<section className="flex flex-col md:flex-row gap-4">
			<section className="flex-1">
				<header>
					<p className="text-public-secondary text-center text-xl font-bold">
						VERIFIKASI AKSES INFORMASI PERKARA BANDING
					</p>
				</header>

				<section>
					<div className="flex justify-center items-center mt-10 mb-6">
						<BsShieldLockFill size={100} className="text-success" />
					</div>

					<p className="text-public-secondary text-center text-sm font-medium">
						Masukkan Kode OTP
					</p>
					<Form
						className="mb-10 justify-center items-center"
						onSubmit={handleSubmit(onSubmit)}>
						{ValidationOTPFieldConfig.map((ff) => {
							const name = ff.name as keyof z.infer<typeof formZodSchema>;
							return (
								<InputOtp
									key={name}
									length={6}
									{...register(name)}
									className="max-w-xs"
									variant="flat"
									color="success"
									label={`Masukkan ${ff.label}`}
									type="number"
									onKeyDown={BlockInvalidInputChar}
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
								color="success"
								size="lg"
								type="submit">
								Validasi OTP
							</Button>
						</div>
					</Form>
				</section>
			</section>
		</section>
	);
};

export default PublicValidateTokenPage;
