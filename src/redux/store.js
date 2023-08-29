import { configureStore } from "@reduxjs/toolkit";
import authReducer from './features/authSlice'
import cardReducer from './features/cardSlice'

export const store = configureStore({
    reducer : {
        authReducer,
        cardReducer,
    }
});