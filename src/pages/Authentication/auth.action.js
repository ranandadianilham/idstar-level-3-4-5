import axios from "axios";
import * as authSlice from "./auth.reducer"; // Import relevant slice actions
const host = "http://localhost:9090/api";

export const authLogin = (body) => async (dispatch) => {
  dispatch(authSlice.loginRequest());
  console.log("login in: ", body);
  try {
    const response = await axios.post(`${host}/login-user`, body);
    console.log("response", response.data.data);
    dispatch(authSlice.loginSuccess(response.data.data));
  } catch (error) {
    dispatch(authSlice.loginFailure(error.message));
  }
};

export const authRegister = (body) => async (dispatch) => {
  dispatch(authSlice.registerRequest());
  console.log("register in: ", body);

  try {
    const response = await axios.post(`${host}/register/langsung`, {...body, gender: body.gender === "male" ? "Laki-laki" : "perempuan"});
    console.log("response ", response.data);
    dispatch(authSlice.registerSuccess(response.data));
  } catch (error) {
    dispatch(authSlice.registerFailure(error.message));
  }
};