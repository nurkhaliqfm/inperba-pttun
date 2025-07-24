import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
} from "@/components/ui/sidebar";

import LogoKampus from "@/assets/logo.svg";
import { SIDEBAR_LIST } from "@/constants/sidebar";
import { Fragment } from "react/jsx-runtime";
import { SidebarUser } from "./SidebarUser";
import { useTypedSelector } from "@/hooks/useTypedSelector";

export function AppSidebar() {
	const user = useTypedSelector((state) => state.oauth.oauthData);

	return (
		<Sidebar variant="inset">
			<SidebarHeader className="flex flex-row items-center gap-x-4">
				<img src={LogoKampus} width={50} />
				<section className="leading-4">
					<h2 className="font-bold text-lg leading-5">Perpustakaan</h2>
					<p className="text-sm font-medium">ITBA Al-Gazali Barru</p>
				</section>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					{SIDEBAR_LIST.map((sidebars, index) => {
						return (
							<Fragment key={`sidebar-group-${index}`}>
								{sidebars.tag && (
									<SidebarGroupLabel>{sidebars.tag}</SidebarGroupLabel>
								)}

								<SidebarGroupContent>
									<SidebarMenu>
										{sidebars.item.map((item) => (
											<SidebarMenuItem key={item.key}>
												<SidebarMenuButton asChild>
													<a href={item.url}>
														<item.icon />
														<span>{item.title}</span>
													</a>
												</SidebarMenuButton>
											</SidebarMenuItem>
										))}
									</SidebarMenu>
								</SidebarGroupContent>
							</Fragment>
						);
					})}
				</SidebarGroup>
			</SidebarContent>

			<SidebarFooter>
				<SidebarUser
					user={{
						role: user?.role,
						name: user?.name,
						token: user?.access_token,
					}}
				/>
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
