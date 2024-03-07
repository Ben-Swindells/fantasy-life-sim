import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: CharactersState = {
  characterList: {},
};

export const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    addCharacter: (state, action: PayloadAction<CharacterState>) => {
      const { id } = action.payload;
      state.characterList[id] = action.payload;
    },
    updatePosition: (
      state,
      action: PayloadAction<{
        id: string;
        position: Vector3;
      }>
    ) => {
      const { id, position } = action.payload;
      state.characterList[id].transform.position = position;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addCharacter, updatePosition } = charactersSlice.actions;

export default charactersSlice.reducer;
