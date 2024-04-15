import axios from "axios";
import * as resetSlice from "./resetPassword.reducer"; // Import relevant slice actions
const host = "http://localhost:9090/api";

export const sendOtp = (body) => async (dispatch) => {
  dispatch(resetSlice.sendOtpRequest());
  try {
    const response = await axios.post(
      `${host}/forget-password/send-langsung`,
      body
    );
    dispatch(resetSlice.sendOtpSuccess(response.data));
  } catch (error) { 
    dispatch(resetSlice.sendOtpFailure(error.message));
  }
};

export const resetPassword = (body) => async (dispatch) => {
  dispatch(resetSlice.resetRequest());

  try {
    const response = await axios.post(
      `${host}/forget-password/change-password-langsung`,
      body
    );
    dispatch(resetSlice.resetSuccess(response.data));
  } catch (error) {
    dispatch(resetSlice.resetFailure(error.message));
  }
};

export const resetAll = () => {
  dispatch(resetSlice.resetAll());
}
