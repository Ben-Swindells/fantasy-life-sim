import { combineReducers, configureStore } from "@reduxjs/toolkit";
import gameReducer from "./slices/game";
import cauldronReducer from "./slices/cauldron";

export const store = configureStore({
  reducer: {
    game: gameReducer,
    cauldron: cauldronReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
