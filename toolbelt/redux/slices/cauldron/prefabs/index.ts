import { createSlice } from "@reduxjs/toolkit";

export interface PrefabsState {

}

const initialState: PrefabsState = {
 
};

export const prefabsSlice = createSlice({
  name: "prefabs",
  initialState,
  reducers: {},
});

// Action creators are generated for each case reducer function
export const {} = prefabsSlice.actions;
export default prefabsSlice.reducer;
