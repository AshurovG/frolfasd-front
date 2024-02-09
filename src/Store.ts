import { combineReducers, configureStore } from "@reduxjs/toolkit"
import authReducer from 'slices/AuthSlice'



export default configureStore({
    reducer: combineReducers({
        mainData: authReducer
    })
})