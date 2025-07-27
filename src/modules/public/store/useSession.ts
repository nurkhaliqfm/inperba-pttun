import { useDispatch } from "react-redux";
import { addToSession, clearSession } from "./session.slice";
import type { OTPItemState } from "@/types/session";

export const useSession = () => {
	const dispatch = useDispatch();

	return {
		add: (item: OTPItemState) => dispatch(addToSession(item)),
		clear: () => dispatch(clearSession()),
	};
};
