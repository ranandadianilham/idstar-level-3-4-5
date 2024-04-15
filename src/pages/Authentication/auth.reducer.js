import { createSlice } from "@reduxjs/toolkit";
export const authSlice = createSlice({
  name: "authreducer",
  initialState: {
    access_token: "",
    user: {},
    token_type: "",
    loginLoading: false,
    registerLoading: false,
    successMessage: "",
    message: "",
    data: {},
    status: null,
  },
  reducers: {
    loginRequest: (state) => {
      state.loginLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.access_token = action.payload.access_token;
      state.user = action.payload.user;
      state.token_type = action.payload.token_type;
      state.successMessage = action.payload.message;
      state.data = action.payload;
      state.loginLoading = false;
    },
    loginFailure(state, action) {
      state.loginLoading = false;
      state.error = action.payload;
    },
    registerRequest: (state) => {
      state.registerLoading = true;
      state.message = "";
      state.status = null;
    },
    registerSuccess: (state, action) => {
      state.registerLoading = false;
      state.data = action.payload;
      state.message = action.payload.message;
      state.status = action.payload.status;
    },
    registerFailure: (state, action) => {
      state.registerLoading = false;
      state.message = action.payload.message;
      state.status = action.payload.status;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerFailure,
  registerRequest,
  registerSuccess,
} = authSlice.actions;

export default authSlice.reducer;
