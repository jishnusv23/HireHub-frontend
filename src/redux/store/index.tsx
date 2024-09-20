import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices/users";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RooteState = ReturnType<typeof store.getState>;
