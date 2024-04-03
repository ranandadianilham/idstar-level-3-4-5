import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
    showForm: false,
    showDelete: false,
    showDetail: false,
    loading: false,
    saveLoading: false,
    deleteLoading: false,
    successMessage: "",
    error: null,
    isEditing: false,
    employees: [],
    employee: {
      id: "",
      name: "",
      nik: "",
      address: "",
      status: true,
    },
  },
  reducers: {
    fetchAllRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchAllDataSuccess: (state, action) => {
      state.employees = action.payload;
      state.loading = false;
    },
    fetchAllDataFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    saveRequest: (state) => {
      state.saveLoading = true;
      state.error = null;
    },
    saveSuccess: (state, action) => {
      state.successMessage = action.payload;
      state.saveLoading = false;
    },
    saveFailure(state, action) {
      state.saveLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchAllDataFailure,
  fetchAllDataSuccess,
  fetchAllRequest,
  saveFailure,
  saveRequest,
  saveSuccess,
} = counterSlice.actions;

export default counterSlice.reducer;
