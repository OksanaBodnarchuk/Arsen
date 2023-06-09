import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { loginSuccess } = userSlice.actions;
