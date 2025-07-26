import { useTypedSelector } from "@/hooks/useTypedSelector";
import { Navigate, Outlet } from "react-router-dom";
import { refresh } from "../services/oauthService";
import { useDispatch } from "react-redux";
import { clearOAuthData, setOAuthData } from "../oauthSlice";
import { useEffect, useState } from "react";
import { Spinner } from "@heroui/react";
import type { OAuthData } from "@/redux/types";

const AuthMiddleware = () => {
	const dispatch = useDispatch();
	const user = useTypedSelector((state) => state.oauth.oauthData);
	const isAuthenticated = !!localStorage.getItem("oauthData");
	const [loading, setLoading] = useState(true);
	const [redirectToLogin, setRedirectToLogin] = useState(false);

	useEffect(() => {
		const checkAuthToken = async () => {
			if (!user || !isAuthenticated) {
				setRedirectToLogin(true);
				setLoading(false);
				return;
			}

			const isTokenExpired = Date.now() >= user.expires_in - 20000;

			if (isTokenExpired) {
				try {
					const oauthData: OAuthData = await refresh(user.access_token);
					dispatch(setOAuthData(oauthData));
				} catch (error) {
					console.log("error Request refresh", error);
					dispatch(clearOAuthData());
					setRedirectToLogin(true);
				} finally {
					setLoading(false);
				}
			} else {
				setLoading(false);
			}
		};

		checkAuthToken();
	}, [user, isAuthenticated, dispatch]);

	if (loading)
		return (
			<section className="flex items-center justify-center h-screen">
				<div className="bg-white rounded-xl shadow-md z-50">
					<Spinner className="m-4" label="Loading..." />
				</div>
			</section>
		);

	if (redirectToLogin || !user || !isAuthenticated) {
		return <Navigate to="/login" replace />;
	}

	return <Outlet />;
};

export default AuthMiddleware;
