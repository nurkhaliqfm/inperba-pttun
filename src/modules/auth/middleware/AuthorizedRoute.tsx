import { useTypedSelector } from "@/hooks/useTypedSelector";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type Props = {
	allowedRoles: Array<string>;
	page: ReactNode;
};

const AuthorizedRoute = ({ page, allowedRoles }: Props) => {
	const role = useTypedSelector((state) => state.oauth.oauthData?.role);

	if (allowedRoles.includes(role ?? "")) {
		return page;
	}

	return <Navigate to={"/fobidden"} />;
};

export default AuthorizedRoute;
