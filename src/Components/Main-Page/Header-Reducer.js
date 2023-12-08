import { createSlice } from '@reduxjs/toolkit';

const headerReducer = createSlice({
    name: 'header',
    initialState: {
        genres: [],
    },
    reducers: {
        changeGenre: (state, action) => {
            state.genres = action.payload.genres;
        },
    },
})

export const { changeGenre } = headerReducer.actions;

export default headerReducer.reducer;
