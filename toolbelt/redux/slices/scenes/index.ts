import { createSlice } from "@reduxjs/toolkit";

export interface ScenesState {
  value: number;
}

const initialState: ScenesState = {
  value: 0,
};

export const scenesSlice = createSlice({
  name: "scenes",
  initialState,
  reducers: {},
});

// Action creators are generated for each case reducer function
export const {} = scenesSlice.actions;

export default scenesSlice.reducer;
