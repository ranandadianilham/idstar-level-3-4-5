import axios from "axios";
import * as dataSlice from "./home.state"; // Import relevant slice actions
const host = "http://localhost:9090/api";
export const fetchEmployeeAll =
  (page = 0, size = 10) =>
  async (dispatch) => {
    dispatch(dataSlice.fetchAllRequest());
    try {
      const response = await axios.get(
        `${host}/v1/karyawan/list?page=${page}&size=${size}`
      );
      console.log("re", response.data.data.content);
      dispatch(dataSlice.fetchAllDataSuccess(response.data.data.content));
    } catch (error) {
      dispatch(dataSlice.fetchAllDataFailure(error.message));
    }
  };

export const fetchEmployeeById = (id) => async (dispatch) => {
  dispatch(dataSlice.fetchByIdRequest());
  try {
    const response = await axios.get(`${host}/v1/karyawan/${id}`);
    dispatch(dataSlice.fetchByIdSuccess(response.data.data));
  } catch (error) {
    dispatch(dataSlice.fetchByIdFailure(error.message));
  }
};

export const createEmployee = (body) => async (dispatch) => {
  dispatch(dataSlice.saveRequest());
  console.log("create new: ", body);
  try {
    const response = await axios.post(`${host}/v1/karyawan/save`, body);
    dispatch(dataSlice.saveSuccess(response.data));
  } catch (error) {
    dispatch(dataSlice.saveFailure(error.message));
  }
};

export const editEmployee = (body) => async (dispatch) => {
  dispatch(dataSlice.saveRequest());
  try {
    const response = await axios.put(`${host}/v1/karyawan/update`, body);
    dispatch(dataSlice.saveSuccess(response.data));
  } catch (error) {
    dispatch(dataSlice.saveFailure(error.message));
  }
};

export const deleteEmployee = (id) => async (dispatch) => {
  dispatch(dataSlice.saveRequest());
  try {
    const response = await axios.delete(`${host}/v1/karyawan/${id}`);
    dispatch(dataSlice.saveSuccess(response.data));
  } catch (error) {
    dispatch(dataSlice.saveFailure(error.message));
  }
};
