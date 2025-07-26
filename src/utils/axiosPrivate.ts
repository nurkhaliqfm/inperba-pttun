import axios from "axios";
import store from "@/redux/store";
import { clearOAuthData, setOAuthData } from "@/modules/auth/oauthSlice";
import { refresh } from "@/modules/auth/services/oauthService";

const { VITE_SERVER_BASE_URL } = import.meta.env;

const axiosPrivate = axios.create({
	baseURL: `${VITE_SERVER_BASE_URL}/admin`,
});

axiosPrivate.interceptors.request.use(async (config) => {
	const state = store.getState();
	const tokenData = state.oauth.oauthData;

	if (tokenData) {
		const isTokenExpired = Date.now() >= tokenData.expires_in - 20000;

		if (isTokenExpired) {
			try {
				const refreshed = await refresh(tokenData.access_token);
				store.dispatch(setOAuthData(refreshed));
				config.headers.Authorization = `Bearer ${refreshed.access_token}`;
			} catch (err) {
				store.dispatch(clearOAuthData());
				window.location.href = "/login"; // 🔁 Redirect to login on failure
				throw err;
			}
		} else {
			config.headers.Authorization = `Bearer ${tokenData.access_token}`;
		}
	}

	return config;
});

export default axiosPrivate;
