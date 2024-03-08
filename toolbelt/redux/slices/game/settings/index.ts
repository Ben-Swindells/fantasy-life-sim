import { PayloadAction, combineReducers, createSlice } from "@reduxjs/toolkit";

const emptyReducer = (state = {}, action: PayloadAction) => state;

// A place to add variables to all scenes
const settingsSlice = createSlice({
  name: "settings",
  initialState: {},
  reducers: {},
});

// Add the scenes slices to the root reducer, world 1, world 2, etc.
const rootReducer = combineReducers({
  emptySlice: emptyReducer,
});

export default rootReducer;
