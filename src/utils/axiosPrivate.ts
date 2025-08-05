import axios from "axios";
import { refresh } from "@/modules/auth/services/oauthService";
import { store } from "@/store/store";
import { clearOAuth, setOAuth } from "@/modules/auth/store/oauth.slice";

const { VITE_SERVER_BASE_URL } = import.meta.env;

const axiosPrivate = axios.create({
	baseURL: `${VITE_SERVER_BASE_URL}/admin`,
});

axiosPrivate.interceptors.request.use(async (config) => {
	const state = store.getState();
	const tokenData = state.oauths.oauthData;

	if (tokenData) {
		const isTokenExpired = Date.now() >= tokenData.expires_in - 20000;

		if (isTokenExpired) {
			try {
				const refreshed = await refresh(tokenData.access_token);
				store.dispatch(setOAuth(refreshed));
				config.headers.Authorization = `Bearer ${refreshed.access_token}`;
			} catch (err) {
				store.dispatch(clearOAuth());
				window.location.href = "/login";
				throw err;
			}
		} else {
			config.headers.Authorization = `Bearer ${tokenData.access_token}`;
		}
	}

	return config;
});

export default axiosPrivate;
