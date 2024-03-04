import { combineReducers, createSlice } from "@reduxjs/toolkit";

// A place to add variables for all prefabs
const prefabsSlice = createSlice({
  name: "prefabs",
  initialState: {},
  reducers: {},
});

// Add the prefabs slices to the root reducer, this could include GameObjects, UI, etc.
const rootReducer = combineReducers({});

export default rootReducer;
