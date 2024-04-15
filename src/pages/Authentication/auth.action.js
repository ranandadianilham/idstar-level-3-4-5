import axios from "axios";
import * as authSlice from "./auth.reducer"; // Import relevant slice actions
const host = "http://localhost:9090/api";

export const authLogin = (body) => async (dispatch) => {
  dispatch(authSlice.loginRequest());
  try {
    const response = await axios.post(`${host}/login-user`, body);
    dispatch(authSlice.loginSuccess(response.data.data));
  } catch (error) {
    dispatch(authSlice.loginFailure(error.message));
  }
};

export const authRegister = (body) => async (dispatch) => {
  dispatch(authSlice.registerRequest());

  try {
    const response = await axios.post(`${host}/register/langsung`, {...body, gender: body.gender === "male" ? "Laki-laki" : "perempuan"});
    dispatch(authSlice.registerSuccess(response.data));
  } catch (error) {
    dispatch(authSlice.registerFailure(error.message));
  }
};