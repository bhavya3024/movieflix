import { createSlice } from '@reduxjs/toolkit';

const headerReducer = createSlice({
    name: 'header',
    initialState: {
        year: 2012,
    },
    reducers: {
        changeYear: (state, action) => {
            console.log(action);
            state.year = action.payload.year;
        },
    },
})

export const { changeYear } = headerReducer.actions;

export default headerReducer.reducer;
