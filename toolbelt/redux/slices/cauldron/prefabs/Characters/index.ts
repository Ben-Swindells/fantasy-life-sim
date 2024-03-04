import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: CharactersState = {
  characters: [],
};

export const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    addCharacter: (state, action: PayloadAction<CharacterState>) => {
      state.characters.push(action.payload);
    },
    removeCharacter: (state, action) => {
      state.characters = state.characters.filter(
        (character) => character.id !== action.payload
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const {} = charactersSlice.actions;

export default charactersSlice.reducer;
