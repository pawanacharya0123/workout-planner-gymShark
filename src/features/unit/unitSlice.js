import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  unit: localStorage.getItem("unit") || "kg",
};
const unitSlice = createSlice({
  name: "unit",
  initialState,
  reducers: {
    toggleUnit: (state) => {
      state.unit = state.unit === "kg" ? "lbs" : "kg";
      localStorage.setItem("unit", state.unit);
    },
    setUnit: (state, payload) => {
      state.unit = payload.action;
      localStorage.setItem("unit", state.unit);
    },
  },
});

export const { toggleUnit, setUnit } = unitSlice.actions;
export default unitSlice.reducer;
