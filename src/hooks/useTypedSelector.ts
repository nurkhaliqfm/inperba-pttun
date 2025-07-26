import type { RootState } from "@/redux/rootReducer";
import { useSelector, type TypedUseSelectorHook } from "react-redux";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
