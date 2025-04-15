import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  unit: "kg",
};
const unitSlice = createSlice({
  name: "unit",
  initialState,
  reducers: {
    toggleUnit: (state) => {
      state.unit = state.unit === "kg" ? "lbs" : "kg";
    },
    setUnit: (state, payload) => {
      state.unit = payload.action;
    },
  },
});

export const { toggleUnit, setUnit } = unitSlice.actions;
export default unitSlice.reducer;
