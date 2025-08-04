import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { oauth } from "../services/oauthService";
import { toast } from "react-toastify";
import { Button, Card, CardBody, Form, Image, Input } from "@heroui/react";
import type { OAuthData } from "../types/oauth.type";
import { useOAuth } from "../store/useOAuth";
import AppRoutes from "@/router/routes";
import {
	PiEyeSlash,
	PiEye,
	PiUserCircleFill,
	PiLockKeyFill,
} from "react-icons/pi";
import Logo from "@/assets/logo/logo_inperba_2.svg";

const formOAuthScheme = z.object({
	username: z.string().min(1, { message: "Username is required" }),
	password: z.string().min(1, { message: "Password is required" }),
});

export function LoginForm() {
	const navigate = useNavigate();
	const authentication = useOAuth();

	const [isPasswordShow, setIsPasswordShow] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<z.infer<typeof formOAuthScheme>>({
		resolver: zodResolver(formOAuthScheme),
		defaultValues: {
			username: "",
			password: "",
		},
	});

	function onSubmit(values: z.infer<typeof formOAuthScheme>) {
		setIsLoading(true);
		oauth({ password: values.password, username: values.username })
			.then((oauthData: OAuthData) => {
				authentication.create(oauthData);

				toast.success("Berhasil Login", {
					autoClose: 1000,
					onClose: () => navigate(AppRoutes.AdminDashboard.path),
				});
			})
			.catch(() => {
				setIsLoading(false);
				toast.error("Username atau Password salah", {
					theme: "colored",
					autoClose: 1000,
				});
			});
	}

	return (
		<Card className="py-4">
			<CardBody className="grid p-0 md:grid-cols-2">
				<div className="flex flex-col">
					<div className="pt-2 px-4 flex-col text-center">
						<p className="text-2xl font-bold">Welcome Back</p>
						<small className="text-medium text-gray-400">
							Login to INFO-PUTUS PTTUN Makassar
						</small>
					</div>

					<Form
						className="justify-center items-center p-6 md:p-8 pt-0"
						onSubmit={handleSubmit(onSubmit)}>
						<Input
							key={"username"}
							{...register("username")}
							isRequired
							className="max-w-lg"
							variant="flat"
							labelPlacement="outside-top"
							placeholder="Masukkan Username"
							startContent={<PiUserCircleFill size={24} />}
							type="text"
							label="Username"
							size="lg"
							errorMessage={errors["username"]?.message}
							isInvalid={!!errors["username"]?.message}
						/>
						<Input
							key={"password"}
							{...register("password")}
							isRequired
							type={isPasswordShow ? "text" : "password"}
							className="max-w-lg"
							variant="flat"
							labelPlacement="outside-top"
							placeholder="Masukkan Password"
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
							label="Password"
							size="lg"
							errorMessage={errors["password"]?.message}
							isInvalid={!!errors["password"]?.message}
						/>

						<div className="flex justify-end w-full">
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
								Login
							</Button>
						</div>
					</Form>
				</div>

				<div className="p-8 relative hidden bg-muted md:flex md:justify-center md:items-center">
					<Image src={Logo} alt="Image" width={200} />
				</div>
			</CardBody>
		</Card>
	);
}
