import { combineReducers, createSlice } from "@reduxjs/toolkit";

// A place to add variables to all scenes
const scenesSlice = createSlice({
  name: "scenes",
  initialState: {},
  reducers: {},
});

// Add the scenes slices to the root reducer, world 1, world 2, etc.
const rootReducer = combineReducers({});

export default rootReducer;
