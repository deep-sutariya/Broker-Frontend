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

        RemoveCard: (state, action) => {
            state.cards.splice(action.payload.index, 1);
        }
    }
})

export const { logOut, logIn, UpdateUser,RemoveCard } = auth.actions;
export default auth.reducer;