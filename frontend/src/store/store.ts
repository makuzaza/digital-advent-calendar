import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./tokenSlice.ts";
import uidReducer from "./uidSlice.ts";

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    uid: uidReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
