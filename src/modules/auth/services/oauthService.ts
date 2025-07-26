import type { OAuthData } from "@/redux/types";
import axios from "axios";

interface CredentialsProps {
	username: string;
	password: string;
}

const {
	VITE_SERVER_BASE_URL,
	VITE_OAUTH0_CLIENT_SECRET,
	VITE_OAUTH0_CLIENT_ID,
	VITE_OAUTH0_GRANT_TYPE,
} = import.meta.env;

const oauth = async (credentials: CredentialsProps): Promise<OAuthData> => {
	try {
		const token = btoa(`${VITE_OAUTH0_CLIENT_ID}:${VITE_OAUTH0_CLIENT_SECRET}`);
		const response = await axios.post(
			VITE_SERVER_BASE_URL + "/oauth/token",
			{
				username: credentials.username,
				password: credentials.password,
				grant_type: VITE_OAUTH0_GRANT_TYPE,
			},
			{ headers: { Authorization: `Basic ${token}` } }
		);

		const oauthData: OAuthData = response.data;
		localStorage.setItem("oauthData", JSON.stringify(oauthData));
		return oauthData;
	} catch (error) {
		console.error("Error handling redirect:", error);
		throw error;
	}
};

const refresh = async (
	token: string | undefined | null
): Promise<OAuthData> => {
	try {
		const response = await axios.get(VITE_SERVER_BASE_URL + "/oauth/refresh", {
			headers: { Authorization: `Bearer ${token}` },
		});

		const oauthData: OAuthData = response.data;
		localStorage.setItem("oauthData", JSON.stringify(oauthData));
		return oauthData;
	} catch (error) {
		console.error("Error handling redirect:", error);
		throw error;
	}
};

const logout = async (token: string | undefined | null) => {
	const response = await axios.get(VITE_SERVER_BASE_URL + "/oauth/logout", {
		headers: { Authorization: `Bearer ${token}` },
	});

	return response.status;
};

export { oauth, refresh, logout };
