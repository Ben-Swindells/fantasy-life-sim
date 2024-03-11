import { combineReducers, createSlice } from "@reduxjs/toolkit";
import scenesReducer from "./scenes";
import settingsReducer from "./settings";
import worldReducer from "./world";
// A place to add variables to the game, like settings etc.
const gameSlice = createSlice({
  name: "game",
  initialState: {},
  reducers: {},
});

// Add the scenes slices to the root reducer, world 1, world 2, etc.
const rootReducer = combineReducers({
  scenes: scenesReducer,
  settings: settingsReducer,
  world: worldReducer,
});

export default rootReducer;
