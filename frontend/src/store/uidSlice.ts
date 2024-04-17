import { createSlice } from "@reduxjs/toolkit";

export const uidSlice = createSlice({
  name: "uid",
  initialState: {
    uid: "",
  },
  reducers: {
    setUid(state, action) {
      state.uid = action.payload;
    },
  },
});

export const { setUid } = uidSlice.actions;

export default uidSlice.reducer;
