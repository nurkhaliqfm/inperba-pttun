import { Navigate, useLocation } from 'react-router-dom';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import AppRoutes from '@/router/routes';
import DashboardLayout from '@/components/layout/dashboard';

const ProtectedRoutes = () => {
	const role = useTypedSelector((state) => state.oauth.oauthData?.role);
	const location = useLocation();

	if (location.pathname === '/admin') {
		switch (role) {
			case 'Admin':
				return <Navigate to={AppRoutes.AdminDashboard.path} />;
			default:
				return <Navigate to={AppRoutes.Error.path} />;
		}
	}

	return <DashboardLayout />;
};

export default ProtectedRoutes;
