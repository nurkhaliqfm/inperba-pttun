import { useDispatch, useSelector } from "react-redux";
import {
	addToSession,
	clearSession,
	selectSessionItems,
	updateValidation,
} from "./session.slice";
import type { OTPItemState } from "@/types/session";

export const useSession = () => {
	const dispatch = useDispatch();
	const items = useSelector(selectSessionItems);

	return {
		data: items,
		add: (item: OTPItemState) => dispatch(addToSession(item)),
		validate: (identity: string) =>
			dispatch(
				updateValidation({
					identity: identity,
				})
			),
		clear: () => dispatch(clearSession()),
	};
};
