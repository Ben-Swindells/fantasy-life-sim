import { combineReducers, createSlice } from "@reduxjs/toolkit";
import charactersReducer from "./Characters";

// A place to add variables for all prefabs
const prefabsSlice = createSlice({
  name: "prefabs",
  initialState: {},
  reducers: {},
});

// Add the prefabs slices to the root reducer, this could include GameObjects, UI, etc.
const rootReducer = combineReducers({
  characters: charactersReducer,
});

export default rootReducer;
