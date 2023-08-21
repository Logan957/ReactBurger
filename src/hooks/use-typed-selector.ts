import { TypedUseSelectorHook, useSelector } from "react-redux";
import { TRootState } from "../services/types/reducer-type";

export const useTypedSelector: TypedUseSelectorHook<TRootState> = useSelector;
