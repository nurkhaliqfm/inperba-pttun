import { Navigate, Route, Routes } from "react-router-dom";
import Error from "../modules/error";
import AppRoutes from "./routes";
import Admin from "../modules/admin";
import Public from "../modules/public";
import PublicLayout from "@/modules/public/components/layout/PublicLayout";

function AppRouter() {
	return (
		<Routes>
			{/* NOTE: Error Route */}
			<Route path={AppRoutes.Error.path} element={<Error.ErrorPage />} />
			<Route path="*" element={<Navigate to={AppRoutes.Error.path} />} />

			{/* NOTE: Forbidden Route  */}
			<Route
				path={AppRoutes.Forbidden.path}
				element={<Error.ForbiddenPage />}
			/>

			<Route element={<PublicLayout />}>
				<Route
					path={AppRoutes.AdminDashboard.path}
					element={<Admin.DashboardAdminPage />}
				/>
				<Route
					path={AppRoutes.AdminCreatePerkara.path}
					element={<Admin.CreatePerkaraAdminPage />}
				/>
			</Route>

			<Route element={<PublicLayout />}>
				<Route
					path={AppRoutes.PublicHome.path}
					element={<Public.PublicHomePage />}
				/>
				<Route
					path={AppRoutes.PublicValidateTokenHome.path}
					element={<Public.PublicValidateTokenPage />}
				/>
				<Route
					path={AppRoutes.PublicPerkara.path}
					element={<Public.PublicPerkaraPage />}
				/>
			</Route>
		</Routes>
	);
}

export default AppRouter;
