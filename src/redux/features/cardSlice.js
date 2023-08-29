import { createSlice } from "@reduxjs/toolkit";

let initialCardState = [];

export const cards = createSlice({
    name: "cards",
    initialState: initialCardState,
    reducers: {
        AddCard: (state, action) => {
            const updatedCards = [...action.payload.cards, action.payload.values];
            console.log("AuthSlice-->",updatedCards);
            return updatedCards;
        },

        UpdateCard: (state, action) => {
            const cardInfo = action.payload;
            console.log(cards);
            return cardInfo;
        }
    }
})

export const { AddCard, UpdateCard } = cards.actions;
export default cards.reducer;