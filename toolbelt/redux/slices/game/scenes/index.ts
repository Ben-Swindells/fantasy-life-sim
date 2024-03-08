import { PayloadAction, combineReducers, createSlice } from "@reduxjs/toolkit";

const emptyReducer = (state = {}, action: PayloadAction) => state;

// A place to add variables to all scenes
const scenesSlice = createSlice({
  name: "scenes",
  initialState: {},
  reducers: {
    emptySlice: emptyReducer,
  },
});

// Add the scenes slices to the root reducer, world 1, world 2, etc.
const rootReducer = combineReducers({});

export default rootReducer;
