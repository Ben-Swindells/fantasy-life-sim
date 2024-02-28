import { configureStore } from "@reduxjs/toolkit";
import sceneReducer from "./slices/scenes";
import prefabsReducer from "./slices/prefabs";

export const store = configureStore({
  reducer: {
    scenes: sceneReducer,
    cauldron: { prefabs: prefabsReducer },
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
