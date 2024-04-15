import axios from "axios";
import * as dataSlice from "./home.state"; // Import relevant slice actions
const host = "http://localhost:9090/api";

// Function to retrieve the token (replace with your token storage logic)
function getToken() {
  // Implement your logic to get the token from storage (e.g., localStorage, Redux store)
  // This example assumes localStorage for simplicity
  return localStorage.getItem('access_token');
}

// Create an Axios instance (optional, but useful for customization)
const axiosInstance = axios.create({host});

// Request interceptor to add the token to headers
const requestInterceptor = config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

// Add the interceptor to the Axios instance or directly to axios
// axiosInstance.interceptors.request.use(requestInterceptor); // For the Axios instance
// or
axios.interceptors.request.use(requestInterceptor);

export const fetchEmployeeAll =
  (page = 0, size = 10) =>
  async (dispatch) => {
    dispatch(dataSlice.fetchAllRequest());
    try {
      const response = await axios.get(
        `${host}/v1/karyawan/list?page=${page}&size=${size}`
      );
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
  dispatch(dataSlice.deleteRequest());
  try {
    const response = await axios.delete(`${host}/v1/karyawan/delete/${id}`);
    dispatch(dataSlice.deleteSuccess(response.data));
    // window.location.reload();
  } catch (error) {
    dispatch(dataSlice.deleteFailure(error.message));
  }
};
