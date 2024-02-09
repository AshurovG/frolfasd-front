import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

interface DataState {
  isAuth: boolean;
}

const dataSlice = createSlice({
  name: "data",
  initialState: {
    isAuth: false
  } as DataState,
  reducers: {
    setIsAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload
    },
  },
});

export const useIsAuth = () =>
  useSelector((state: { mainData: DataState }) => state.mainData.isAuth);

export const {
    setIsAuth: setIsAuthAction,
} = dataSlice.actions;

export default dataSlice.reducer;