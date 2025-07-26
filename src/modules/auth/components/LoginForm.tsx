import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { setOAuthData } from "../oauthSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { oauth } from "../services/oauthService";
import { OAuthData } from "@/redux/types";
import { toast } from "react-toastify";
import {
	PiEye,
	PiEyeSlash,
	PiLockKeyFill,
	PiUserCircleFill,
} from "react-icons/pi";
import { Loader2 } from "lucide-react";
import LogoITBA from "@/assets/logo.svg";

const formOAuthScheme = z.object({
	username: z.string().min(1, { message: "Username is required" }),
	password: z.string().min(1, { message: "Password is required" }),
});

export function LoginForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [isPasswordShow, setIsPasswordShow] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const formOAuth = useForm<z.infer<typeof formOAuthScheme>>({
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
				dispatch(setOAuthData(oauthData));
				toast.success("Berhasil Login", {
					autoClose: 1000,
					onClose: () => navigate("/admin/dashboard"),
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
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card className="overflow-hidden">
				<CardContent className="grid p-0 md:grid-cols-2">
					<Form {...formOAuth}>
						<form
							onSubmit={formOAuth.handleSubmit(onSubmit)}
							className="p-6 md:p-8">
							<div className="flex flex-col gap-6">
								<div className="flex flex-col items-center text-center">
									<h1 className="text-2xl font-bold">Welcome Back</h1>
									<p className="text-balance text-muted-foreground">
										Login to E-Library ITBA Al-Gazali Barru
									</p>
								</div>

								<div>
									<FormField
										control={formOAuth.control}
										name="username"
										render={({ field }) => (
											<FormItem>
												<FormLabel className="text-xs text-primary font-medium">
													Username
												</FormLabel>
												<FormControl>
													<div className="relative">
														<div className="bg-primary rounded-l-lg p-4 absolute left-0 top-1/2 -translate-y-1/2">
															<PiUserCircleFill className="text-primary-foreground scale-150" />
														</div>
														<input
															type="text"
															className="pl-16 w-full py-3 px-4 my-1 bg-accent rounded-lg font-semibold outline-none focus:outline-primary focus:bg-primary-foreground"
															placeholder="example@example.com"
															{...field}
														/>
													</div>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={formOAuth.control}
										name="password"
										render={({ field }) => (
											<FormItem>
												<FormLabel className="text-xs text-primary font-medium">
													Password
												</FormLabel>
												<FormControl>
													<div className="relative">
														<div className="bg-primary rounded-l-lg p-4 absolute left-0 top-1/2 -translate-y-1/2">
															<PiLockKeyFill className="text-primary-foreground scale-150" />
														</div>
														<input
															className="pl-16 w-full py-3 px-4 rounded-lg my-1 font-semibold outline-none bg-accent focus:outline-primary focus:bg-primary-foreground"
															type={`${isPasswordShow ? "text" : "password"}`}
															autoComplete="true"
															placeholder="Masukkan password"
															{...field}
														/>
														{isPasswordShow ? (
															<PiEyeSlash
																className="cursor-pointer scale-150 text-primary hover:text-primary-foreground duration-300 absolute right-3 top-1/2 -translate-y-1/2"
																onClick={() =>
																	setIsPasswordShow(!isPasswordShow)
																}
															/>
														) : (
															<PiEye
																className="cursor-pointer scale-150 text-primary hover:text-primary-foreground duration-300 absolute right-3 top-1/2 -translate-y-1/2"
																onClick={() =>
																	setIsPasswordShow(!isPasswordShow)
																}
															/>
														)}
													</div>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								{isLoading ? (
									<Button disabled className="w-full mt-4">
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										Loading
									</Button>
								) : (
									<Button
										type="submit"
										variant="default"
										className="w-full mt-4">
										Login
									</Button>
								)}
							</div>
						</form>
					</Form>
					<div className="relative hidden bg-muted md:flex md:justify-center md:items-center">
						<img src={LogoITBA} alt="Image" className=" h-1/2 w-1/2" />
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
