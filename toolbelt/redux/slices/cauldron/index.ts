import { createSlice } from "@reduxjs/toolkit";

export interface CauldronState {
  value: number;
}

const initialState: CauldronState = {
  value: 0,
};

export const cauldronSlice = createSlice({
  name: "prefabs",
  initialState,
  reducers: {},
});

// Action creators are generated for each case reducer function
export const {} = cauldronSlice.actions;
export default cauldronSlice.reducer;
