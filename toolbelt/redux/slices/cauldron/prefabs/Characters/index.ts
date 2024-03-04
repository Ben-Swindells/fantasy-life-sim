import { createSlice } from "@reduxjs/toolkit";

export interface CharacterState {
  transform: {
    position: { x: number; y: number; z: number };
    rotation: { x: number; y: number; z: number };
    scale: { x: number; y: number; z: number };
  };
}

const initialState: CharacterState = {
  transform: {
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 1, y: 1, z: 1 },
  },
};

export const characterSlice = createSlice({
  name: "character",
  initialState,
  reducers: {},
});

// Action creators are generated for each case reducer function
export const {} = characterSlice.actions;

export default characterSlice.reducer;
