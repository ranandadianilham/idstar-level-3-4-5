import { createSlice } from "@reduxjs/toolkit";
export const passwordResetSlice = createSlice({
  name: "resetPasswordReducer",
  initialState: {
    sendOtpLoading: false,
    resetLoading: false,
    message: "",
    data: {},
    resetData: {},
    status: null,
    error: null,
    otp: "",
  },
  reducers: {
    sendOtpRequest: (state) => {
      state.sendOtpLoading = true;
      state.message = "";
      state.status = null;
      state.error = null;
    },
    sendOtpSuccess: (state, action) => {
      state.data = action.payload;
      state.sendOtpLoading = false;
    },
    sendOtpFailure(state, action) {
      state.sendOtpLoading = false;
      state.error = action.payload;
    },
    resetRequest: (state) => {
      state.resetLoading = true;
      state.message = "";
      state.status = null;
      state.error = null;
    },
    resetSuccess: (state, action) => {
      state.resetLoading = false;
      state.resetData = action.payload;
    },
    resetFailure: (state, action) => {
      state.resetLoading = false;
      state.error = action.payload;
    },
    resetAll: () => {
      state.resetData = {};
      state.data = {};
    },
  },
});

export const {
  sendOtpRequest,
  sendOtpFailure,
  sendOtpSuccess,
  resetFailure,
  resetRequest,
  resetSuccess,
  resetAll
} = passwordResetSlice.actions;

export default passwordResetSlice.reducer;
