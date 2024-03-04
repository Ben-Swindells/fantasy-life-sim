import { combineReducers, createSlice } from "@reduxjs/toolkit";
import prefabsReducer from "./prefabs";

// A place to add variables to the cauldron website
const cauldronSlice = createSlice({
  name: "cauldron",
  initialState: {},
  reducers: {},
});

const rootReducer = combineReducers({
  prefabs: prefabsReducer,
});

export default rootReducer;
