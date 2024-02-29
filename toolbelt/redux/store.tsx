import { combineReducers, configureStore } from "@reduxjs/toolkit";
import sceneReducer from "./slices/scenes";
import prefabsReducer from "./slices/cauldron/prefabs";
import gameReducer from "./slices/gameSlice";

export const store = configureStore({
  reducer: {
    scenes: sceneReducer,
    cauldron: combineReducers({
      prefabs: prefabsReducer,
    }),
    game: gameReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
