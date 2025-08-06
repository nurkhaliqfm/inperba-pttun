import { Navigate, Route, Routes } from "react-router-dom";
import Error from "../modules/error";
import AppRoutes from "./routes";
import Admin from "../modules/admin";
import Public from "../modules/public";
import AuthMiddleware from "@/modules/auth/middleware/AuthMiddleware";
import ProtectedRoutes from "@/modules/auth/middleware/ProtectedRoutes";
import Auth from "@/modules/auth";
import PublicLayout from "@/components/layout/Public";

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

			{/* NOTE: Login Route */}
			<Route path={AppRoutes.Login.path} element={<Auth.LoginPage />} />

			<Route element={<AuthMiddleware />}>
				<Route path="/admin" element={<ProtectedRoutes />}>
					<Route
						path={AppRoutes.AdminDashboard.path}
						element={<Admin.DashboardAdminPage />}
					/>
					<Route
						path={AppRoutes.AdminCreatePerkara.path}
						element={<Admin.CreatePerkaraAdminPage />}
					/>
					<Route
						path={AppRoutes.AdminEditPerkara.path}
						element={<Admin.EditPerkaraAdminPage />}
					/>
					<Route
						path={AppRoutes.AdminResetPassword.path}
						element={<Admin.ResetPasswordPage />}
					/>
				</Route>
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
