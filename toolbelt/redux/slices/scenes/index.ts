import { createSlice } from "@reduxjs/toolkit";

export interface ScenesState {

}

const initialState: ScenesState = {

};

export const scenesSlice = createSlice({
  name: "scenes",
  initialState,
  reducers: {},
});

// Action creators are generated for each case reducer function
export const {} = scenesSlice.actions;

export default scenesSlice.reducer;
