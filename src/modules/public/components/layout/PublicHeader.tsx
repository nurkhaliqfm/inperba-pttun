import Logo from "@/assets/logo/logo_inperba_1.svg";
import { Image } from "@heroui/image";
import { useNavigate } from "react-router-dom";
import AppRoutes from "@/router/routes";
import { useEffect, useState } from "react";
import { cn } from "@heroui/react";

const PublicHeader = () => {
	const navigate = useNavigate();
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<header
			className={cn(
				"flex fixed justify-center h-16 w-full transition-all duration-150",
				!isScrolled ? "bg-public-primary/0" : "bg-public-primary"
			)}>
			<div className="flex w-full justify-between items-center gap-2 px-4 py-9 max-w-6xl">
				<Image
					className="text-delivery-accent cursor-pointer"
					src={Logo}
					alt="cafe U"
					width={150}
					onClick={() => navigate(AppRoutes.PublicAuthentication.path)}
				/>
			</div>
		</header>
	);
};

export default PublicHeader;
