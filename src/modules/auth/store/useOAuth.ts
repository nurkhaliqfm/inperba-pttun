import { useDispatch, useSelector } from "react-redux";

import { clearOAuth, selectAuthSession, setOAuth } from "./oauth.slice";
import type { OAuthData } from "../types/oauth.type";

export const useOAuth = () => {
	const dispatch = useDispatch();
	const items = useSelector(selectAuthSession);

	return {
		create: (data: OAuthData) => dispatch(setOAuth(data)),
		auth: items,
		clear: () => dispatch(clearOAuth()),
	};
};
