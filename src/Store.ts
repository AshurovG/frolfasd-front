import { combineReducers, configureStore } from "@reduxjs/toolkit"
import authReducer from "slices/AuthSlice"
import pageReducer from "slices/PageSlice"

export default configureStore({
  reducer: combineReducers({
    mainData: authReducer,
    pageData: pageReducer,
  }),
})
