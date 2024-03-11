import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../../store";

const initialState: MainCameraState = {
  id: "",
  transform: {
    position: [{ x: 0, y: 0, z: 0 }],
    rotation: [{ x: 0, y: 0, z: 0 }],
    scale: [{ x: 0, y: 0, z: 0 }],
  },
};

export const mainCameraSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    addMainCamera: (state, action: PayloadAction<CharacterState>) => {},
  },
});

// Action creators are generated for each case reducer function
export const {} = mainCameraSlice.actions;

export default mainCameraSlice.reducer;
