import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    cards: []
};

export const auth = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        logOut: () => {
            return {};
        },

        logIn: (state, action) => {
            return action.payload;
        },
    }
})

export const { logOut, logIn, UpdateUser } = auth.actions;
export default auth.reducer;