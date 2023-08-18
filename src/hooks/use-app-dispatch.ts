import { useDispatch } from "react-redux";
import { TAppDispatch } from "../services/types/reducer-type";

export const useAppDispatch = () => useDispatch<TAppDispatch>();