import { Navigate, Route, Routes } from "react-router-dom";
import Error from "../modules/error";
import AppRoutes from "./routes";
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
					path={AppRoutes.PublicAuthentication.path}
					element={<Public.PublicAuthentication />}
				/>
			</Route>
		</Routes>
	);
}

export default AppRouter;
