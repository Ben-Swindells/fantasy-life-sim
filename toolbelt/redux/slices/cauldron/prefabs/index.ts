import { createSlice } from "@reduxjs/toolkit";

export interface PrefabsState {
  value: number;
}

const initialState: PrefabsState = {
  value: 0,
};

export const prefabsSlice = createSlice({
  name: "prefabs",
  initialState,
  reducers: {},
});

// Action creators are generated for each case reducer function
export const {} = prefabsSlice.actions;
export default prefabsSlice.reducer;
