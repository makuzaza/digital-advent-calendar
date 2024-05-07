import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// Define slice state type
export interface TokenState {
  token: string;
}

// Initial state
const initialState: TokenState = {
  token: "",
};

export const tokenSlice = createSlice({
  name: "token",
  initialState: initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
  },
});

export const { setToken } = tokenSlice.actions;

export default tokenSlice.reducer;
