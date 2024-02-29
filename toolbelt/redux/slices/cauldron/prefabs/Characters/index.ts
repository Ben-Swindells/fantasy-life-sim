import { createSlice } from "@reduxjs/toolkit";

export interface CharacterState {

}

const initialState: CharacterState = {
 
};

export const characterSlice = createSlice({
  name: "character",
  initialState,
  reducers: {},
});

// Action creators are generated for each case reducer function
export const {} = characterSlice.actions;

export default characterSlice.reducer;
