import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// Define slice state type
export interface UidState {
  uid: string;
}

// Initial state
const initialState: UidState = {
  uid: "",
};

export const uidSlice = createSlice({
  name: "uid",
  initialState: initialState,
  reducers: {
    setUid(state, action: PayloadAction<string>) {
      state.uid = action.payload;
    },
  },
});

export const { setUid } = uidSlice.actions;

export default uidSlice.reducer;
