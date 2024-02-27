import { createSlice } from "@reduxjs/toolkit";

export interface SceneState {
  value: number;
}

const initialState: SceneState = {
  value: 0,
};

export const sceneSlice = createSlice({
  name: "scene",
  initialState,
  reducers: {},
});

// Action creators are generated for each case reducer function
export const {} = sceneSlice.actions;

export default sceneSlice.reducer;
