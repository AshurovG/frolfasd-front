import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { useSelector } from "react-redux"

interface DataState {
  isMainPage: boolean
}

const dataSlice = createSlice({
  name: "data",
  initialState: {
    isMainPage: false,
  } as DataState,
  reducers: {
    setIsMainPage(state, action: PayloadAction<boolean>) {
      state.isMainPage = action.payload
    },
  },
})

export const useIsMainPage = () =>
  useSelector((state: { pageData: DataState }) => state.pageData.isMainPage)

export const { setIsMainPage: setIsMainPageAction } = dataSlice.actions

export default dataSlice.reducer
