import { createSlice } from "@reduxjs/toolkit";

const carCountSlice = createSlice({
    name: "carCount",
    initialState: 0,
    reducers: {
        setCarCount: (state, action) => {
            return action.payload;
        }
    }
});

export const { setCarCount } = carCountSlice.actions;

export default carCountSlice.reducer;
