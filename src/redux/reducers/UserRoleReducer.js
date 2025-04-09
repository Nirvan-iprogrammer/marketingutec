import { createSlice } from "@reduxjs/toolkit";

const initState = {
  userRoleData: {},
};

const authSlice = createSlice({
  name: "userRoles",
  initialState: { ...initState },
  reducers: {
    setUserRole: (state, { payload }) => {
      state.userRoleData = payload;
      return state;
    },
  },
});

export const { setUserRole } =
  authSlice.actions;
export default authSlice.reducer;
