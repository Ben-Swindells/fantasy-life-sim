import { Vector3 } from "@react-three/fiber";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: CharactersState = {
  characterList: [],
};

export const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    addCharacter: (state, action: PayloadAction<CharacterState>) => {
      const { id } = action.payload;
      const newCharacter = {
        id: action.payload,
      };
      //@ts-ignore
      state.characterList.push(newCharacter);
    },
    updatePosition: (
      state,
      action: PayloadAction<{
        id: string;
        position: Vector3;
      }>
    ) => {},
  },
});

// Action creators are generated for each case reducer function
export const { addCharacter, updatePosition } = charactersSlice.actions;

export default charactersSlice.reducer;
