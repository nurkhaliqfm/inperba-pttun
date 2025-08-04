import { Navigate } from "react-router-dom";
import { useOAuth } from "../store/useOAuth";
import type { ReactNode } from "react";

type Props = {
	allowedRoles: Array<string>;
	page: ReactNode;
};

const AuthorizedRoute = ({ page, allowedRoles }: Props) => {
	const { auth } = useOAuth();

	if (auth && allowedRoles.includes(auth.role ?? "")) {
		return <>{page}</>;
	}

	return <Navigate to="/forbidden" replace />;
};

export default AuthorizedRoute;
