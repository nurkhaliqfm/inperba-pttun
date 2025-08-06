import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { Button, Card, CardBody, Form, Input } from "@heroui/react";
import AppRoutes from "@/router/routes";
import { PiEyeSlash, PiEye, PiLockKeyFill } from "react-icons/pi";
import { updatePassword } from "../service/userService";

const formOAuthScheme = z
	.object({
		oldpassword: z.string().min(8, "Password must be at least 8 characters"),
		newpassword: z
			.string()
			.min(8, "New password must be at least 8 characters"),
	})
	.refine((data) => data.oldpassword !== data.newpassword, {
		path: ["newpassword"],
		message: "New password must be different from current password",
	});

export function ResetPasswordForm() {
	const navigate = useNavigate();

	const [isPasswordShow, setIsPasswordShow] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<z.infer<typeof formOAuthScheme>>({
		resolver: zodResolver(formOAuthScheme),
		defaultValues: {
			newpassword: "",
			oldpassword: "",
		},
	});

	function onSubmit(values: z.infer<typeof formOAuthScheme>) {
		setIsLoading(true);

		updatePassword({
			data: { password: values.oldpassword, newpassword: values.newpassword },
			onDone: (data) => {
				if (data.status === 200) {
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
		<Card className="py-4 shadow-none">
			<CardBody className="grid p-0 md:grid-cols-1">
				<div className="flex flex-col">
					<div className="pt-2 pb-6 px-4 flex-col text-center">
						<p className="text-2xl font-bold">Reset Password</p>
						<small className="text-medium text-gray-400">
							Reset password akun INFO-PUTUS PTTUN Makassar
						</small>
					</div>

					<Form
						className="justify-center items-center pb-4 px-6 md:px-8 pt-0"
						onSubmit={handleSubmit(onSubmit)}>
						<Input
							key={"oldpassword"}
							{...register("oldpassword")}
							isRequired
							type={isPasswordShow ? "text" : "password"}
							className="max-w-lg"
							variant="flat"
							labelPlacement="outside-top"
							placeholder="Masukkan Password Lama"
							startContent={<PiLockKeyFill size={24} />}
							endContent={
								<button
									aria-label="toggle password visibility"
									className="focus:outline-solid outline-transparent"
									type="button"
									onClick={() => setIsPasswordShow(!isPasswordShow)}>
									{isPasswordShow ? (
										<PiEyeSlash className="text-2xl text-default-400 pointer-events-none" />
									) : (
										<PiEye className="text-2xl text-default-400 pointer-events-none" />
									)}
								</button>
							}
							label="Password Lama"
							size="lg"
							errorMessage={errors["oldpassword"]?.message}
							isInvalid={!!errors["oldpassword"]?.message}
						/>
						<Input
							key={"newpassword"}
							{...register("newpassword")}
							isRequired
							type={isPasswordShow ? "text" : "password"}
							className="max-w-lg"
							variant="flat"
							labelPlacement="outside-top"
							placeholder="Masukkan Password Baru"
							startContent={<PiLockKeyFill size={24} />}
							endContent={
								<button
									aria-label="toggle password visibility"
									className="focus:outline-solid outline-transparent"
									type="button"
									onClick={() => setIsPasswordShow(!isPasswordShow)}>
									{isPasswordShow ? (
										<PiEyeSlash className="text-2xl text-default-400 pointer-events-none" />
									) : (
										<PiEye className="text-2xl text-default-400 pointer-events-none" />
									)}
								</button>
							}
							label="Password Baru"
							size="lg"
							errorMessage={errors["newpassword"]?.message}
							isInvalid={!!errors["newpassword"]?.message}
						/>

						<div className="flex justify-end gap-2 w-lg">
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
								className="mt-4 w-full text-danger"
								color="danger"
								variant="ghost"
								size="lg"
								onPress={() => navigate(AppRoutes.AdminDashboard.path)}>
								Batal
							</Button>
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
								className="mt-4 w-full text-public-secondary"
								color="success"
								size="lg"
								type="submit">
								Simpan
							</Button>
						</div>
					</Form>
				</div>
			</CardBody>
		</Card>
	);
}
