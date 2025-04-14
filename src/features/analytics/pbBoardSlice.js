import { createSlice } from "@reduxjs/toolkit";
const initialState = [];

const pbBoardSlice = createSlice({
  name: "pb",
  initialState,
  reducers: {
    addPB: (state, action) => {
      state.push(action.payload);
    },
    removePB: (state, action) => {
      return state.filter((s) => s != action.payload);
    },
  },
});

export const { addPB, removePB } = pbBoardSlice.actions;
export default pbBoardSlice.reducer;
