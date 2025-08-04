import { Navigate, useLocation } from "react-router-dom";
import AppRoutes from "@/router/routes";
import { useOAuth } from "../store/useOAuth";
import PublicLayout from "@/modules/public/components/layout/PublicLayout";

const ProtectedRoutes = () => {
	const authentication = useOAuth();
	const role = authentication.auth.role;
	const location = useLocation();

	if (location.pathname === "/admin") {
		switch (role) {
			case "Admin":
				return <Navigate to={AppRoutes.AdminDashboard.path} />;
			default:
				return <Navigate to={AppRoutes.Error.path} />;
		}
	}

	return <PublicLayout />;
};

export default ProtectedRoutes;
