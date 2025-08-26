import Logo from "@/assets/logo/logo_inperba_1.svg";
import { Image } from "@heroui/image";
import { useLocation, useNavigate } from "react-router-dom";
import AppRoutes from "@/router/routes";
import { useEffect, useState } from "react";
import {
	Button,
	cn,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from "@heroui/react";
import { useOAuth } from "@/modules/auth/store/useOAuth";
import { HiHome } from "react-icons/hi2";
import Avatar from "@/assets//img/avatar.png";
import { logout } from "@/modules/auth/services/oauthService";
import { toast } from "react-toastify";
import {
	connectWhatsapp,
	diconnectWhatsapp,
	statusWhatsapp,
} from "@/modules/admin/service/whatsappService";

const PublicHeader = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const pathLocation = location.pathname.split("/")[1];

	const [isScrolled, setIsScrolled] = useState(false);
	const [isWaConnected, setIsWaConnected] = useState(false);
	const { auth, clear } = useOAuth();

	const onConnectWhatsapp = (phone: string) => {
		connectWhatsapp({
			phone: phone,
			onDone: (data) => {
				console.log("Whatsapp connected:", data);
				if (data.status === 201) {
					setIsWaConnected(true);
				} else {
					setIsWaConnected(false);
				}
			},
		});
	};

	const onDisconnectWhatsapp = (phone: string) => {
		diconnectWhatsapp({
			phone: phone,
			onDone: (data) => {
				console.log("Whatsapp connected:", data);
				if (data.status === 201) {
					setIsWaConnected(false);
				}
			},
		});
	};

	const onLogout = () => {
		logout()
			.then((status) => {
				if (status) {
					clear();
					localStorage.removeItem("oauthData");
				}
			})
			.then(() => {
				navigate(AppRoutes.Login.path);
				toast.success("Berhasil Logout", {
					autoClose: 1000,
				});
			})
			.catch(() => {
				toast.error("Gagal Logout", {
					theme: "colored",
					autoClose: 1000,
				});
			});
	};

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		statusWhatsapp({
			onDone: (data) => {
				if (data.status === 200) {
					setIsWaConnected(data.data as boolean);
				} else {
					toast.error(data.message, {
						theme: "colored",
						autoClose: 1000,
					});
				}
			},
			onError: (error) => {
				toast.error(error.error, {
					theme: "colored",
					autoClose: 1000,
					onClose: () => {
						setIsWaConnected(false);
					},
				});
			},
		});
	}, []);

	return (
		<header
			className={cn(
				"flex fixed z-50 justify-center h-16 w-full transition-all duration-150",
				!isScrolled ? "bg-public-primary/0" : "bg-public-primary"
			)}>
			<div className="flex w-full justify-between items-center gap-2 px-4 pt-8 pb-11 max-w-6xl">
				<Image
					className="text-delivery-accent cursor-pointer"
					src={Logo}
					alt="cafe U"
					width={180}
					onClick={() => navigate(AppRoutes.PublicHome.path)}
				/>
				{auth ? (
					<Dropdown>
						<DropdownTrigger>
							<Image
								className="cursor-pointer"
								alt="Info Putus"
								radius="full"
								src={Avatar}
								width={40}
							/>
						</DropdownTrigger>
						<DropdownMenu aria-label="Static Actions">
							{pathLocation === "admin" ? (
								<DropdownItem
									key="home"
									onPress={() => navigate(AppRoutes.PublicHome.path)}>
									Home
								</DropdownItem>
							) : (
								<DropdownItem
									key="dashboard"
									onPress={() => navigate(AppRoutes.AdminDashboard.path)}>
									Dashboard
								</DropdownItem>
							)}

							{isWaConnected ? (
								<DropdownItem
									key="disconnect-wa"
									onPress={() => onDisconnectWhatsapp("6281241285382")}>
									Disconnect WA
								</DropdownItem>
							) : (
								<DropdownItem
									key="connect-wa"
									onPress={() => onConnectWhatsapp("6281241285382")}>
									Connect WA
								</DropdownItem>
							)}

							<DropdownItem
								key="setting"
								onPress={() => navigate(AppRoutes.AdminResetPassword.path)}>
								Reset Password
							</DropdownItem>
							<DropdownItem
								key="logout"
								className="text-danger"
								color="danger"
								onPress={onLogout}>
								Log Out
							</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				) : (
					<>
						{pathLocation !== "login" && (
							<Button
								variant="ghost"
								color="success"
								startContent={<HiHome />}
								onPress={() => navigate(AppRoutes.Login.path)}>
								Login
							</Button>
						)}
					</>
				)}
			</div>
		</header>
	);
};

export default PublicHeader;
