import { Navigate, Outlet } from "react-router-dom";
import { refresh } from "../services/oauthService";
import { useEffect, useState } from "react";
import { Spinner } from "@heroui/react";
import { useOAuth } from "../store/useOAuth";
import type { OAuthData } from "../types/oauth.type";

const AuthMiddleware = () => {
	const authentication = useOAuth();
	const [loading, setLoading] = useState(true);
	const [redirectToLogin, setRedirectToLogin] = useState(false);

	useEffect(() => {
		const checkAuthToken = async () => {
			if (authentication && authentication.auth) {
				const isTokenExpired =
					Date.now() >= authentication.auth.expires_in - 20000;

				if (isTokenExpired) {
					try {
						const oauthData: OAuthData = await refresh(
							authentication.auth.access_token
						);
						authentication.create(oauthData);
					} catch (error) {
						console.log("error Request refresh", error);
						authentication.clear();
						setRedirectToLogin(true);
					} finally {
						setLoading(false);
					}
				} else {
					setLoading(false);
				}
			} else {
				setRedirectToLogin(true);
				setLoading(false);
				return;
			}
		};

		checkAuthToken();
	}, [authentication]);

	if (loading)
		return (
			<section className="flex items-center justify-center h-screen">
				<div className="bg-white rounded-xl shadow-md z-50">
					<Spinner className="m-4" label="Loading..." />
				</div>
			</section>
		);

	if (redirectToLogin || !authentication.auth) {
		return <Navigate to="/login" replace />;
	}

	return <Outlet />;
};

export default AuthMiddleware;
