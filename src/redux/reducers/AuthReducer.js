import { createSlice } from "@reduxjs/toolkit";

const initState = {
  user: {},
  role: "guest",
  isAuthenticated: false,
  cognitoUser:{},
  userDetails: {}
};

const authSlice = createSlice({
  name: "auth",
  initialState: { ...initState },
  reducers: {
    reset: (state) => {
      state = { ...initState };
      return state;
    },
    setUserDetails: (state, { payload }) => {
      state.userDetails = payload;
      return state;
    },
    setIsAuthenticated: (state, { payload }) => {
      state.isAuthenticated = payload;
      return state;
    },
    logoutUser: (state, { payload }) => {
      return { ...initState };
    },
    setCognitoUser  :(state,{payload})=>{
      state.cognitoUser = payload;
      return state
    }
  },
});

export const { reset, setUserDetails, setIsAuthenticated, logoutUser, setCognitoUser } =
  authSlice.actions;
export default authSlice.reducer;
