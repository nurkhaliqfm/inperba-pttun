import { Navigate, useLocation } from "react-router-dom";
import AppRoutes from "@/router/routes";
import { useOAuth } from "../store/useOAuth";
import PublicLayout from "@/modules/public/components/layout/PublicLayout";

const ProtectedRoutes = () => {
	const { auth } = useOAuth();
	const location = useLocation();

	if (auth && location.pathname === "/admin") {
		switch (auth.role) {
			case "Admin":
				return <Navigate to={AppRoutes.AdminDashboard.path} />;
			default:
				return <Navigate to={AppRoutes.Error.path} />;
		}
	}

	return <PublicLayout />;
};

export default ProtectedRoutes;
