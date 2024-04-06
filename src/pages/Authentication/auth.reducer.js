import { createSlice } from "@reduxjs/toolkit";
export const authSlice = createSlice({
  name: "authreducer",
  initialState: {
    access_token: "",
    user: {},
    token_type: "",
    loginLoading: {},
    registerLoading: {},
    successMessage: '',
    data: {}
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
  },
});

export const {
    loginRequest,
    loginSuccess,
    loginFailure
} = authSlice.actions;

export default authSlice.reducer;
