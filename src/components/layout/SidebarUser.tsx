import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";

import ProfilePic from "@/assets/avatar.png";
import {
	HiOutlineHome,
	HiOutlineArrowRightOnRectangle,
	HiOutlineChevronUpDown,
} from "react-icons/hi2";
import { logout } from "@/modules/auth/services/oauthService";
import { useDispatch } from "react-redux";
import { clearOAuthData } from "@/modules/auth/oauthSlice";
import { useNavigate } from "react-router-dom";
import AppRoutes from "@/router/routes";
import { toast } from "react-toastify";

export function SidebarUser({
	user,
}: {
	user: {
		name: string | null | undefined;
		role: string | null | undefined;
		avatar?: string;
		token: string | null | undefined;
	};
}) {
	const { isMobile } = useSidebar();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onLogout = () => {
		if (user.token) {
			logout(user.token)
				.then((status) => {
					if (status) {
						dispatch(clearOAuthData());
						localStorage.removeItem("oauthData");
					}
				})
				.then(() => {
					navigate(AppRoutes.Login.path);
					toast.success("Berhasil Logout", {
						autoClose: 700,
					});
				})
				.catch(() => {
					toast.error("Gagal Logout", {
						theme: "colored",
						autoClose: 700,
					});
				});
		}
	};

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
							<Avatar className="h-8 w-8 rounded-lg">
								<AvatarImage
									src={user.avatar ?? ProfilePic}
									alt={user.name || ""}
								/>
								<AvatarFallback className="rounded-lg">AD</AvatarFallback>
							</Avatar>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-semibold">{user.name}</span>
								<span className="truncate text-xs">
									{user.role?.toLocaleUpperCase()}
								</span>
							</div>
							<HiOutlineChevronUpDown className="ml-auto size-4" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
						side={isMobile ? "bottom" : "right"}
						align="end"
						sideOffset={4}>
						<DropdownMenuLabel className="p-0 font-normal">
							<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
								<Avatar className="h-8 w-8 rounded-lg">
									<AvatarImage
										src={user.avatar ?? ProfilePic}
										alt={user.name ?? ""}
									/>
									<AvatarFallback className="rounded-lg">AD</AvatarFallback>
								</Avatar>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-semibold">{user.name}</span>
									<span className="truncate text-xs">
										{user.role?.toLocaleUpperCase()}
									</span>
								</div>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem>
								<HiOutlineHome />
								Home
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuItem onClick={() => onLogout()}>
							<HiOutlineArrowRightOnRectangle />
							Log out
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
