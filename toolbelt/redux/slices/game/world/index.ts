import { PayloadAction, combineReducers, createSlice } from "@reduxjs/toolkit";
import mainCameraReducer from "./MainCamera";

// A place to add variables to all scenes
const worldSlice = createSlice({
  name: "world",
  initialState: {},
  reducers: {},
});

// Add the scenes slices to the root reducer, world 1, world 2, etc.
const rootReducer = combineReducers({
  mainCamera: mainCameraReducer,
});

export default rootReducer;
