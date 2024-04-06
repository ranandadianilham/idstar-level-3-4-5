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
    editLoading: false,
    deleteLoading: false,
    viewLoading: false,
    successMessage: "",
    error: null,
    isEditing: false,
    employees: [],
    employee: {
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
    editRequest: (state) => {
      state.editLoading = true;
      state.error = null;
    },
    editSuccess: (state, action) => {
      state.successMessage = action.payload;
      state.editLoading = false;
    },
    editFailure(state, action) {
      state.editLoading = false;
      state.error = action.payload;
    },
    fetchByIdRequest: (state) => {
      state.viewLoading = true;
      state.error = null;
    },
    fetchByIdSuccess: (state, action) => {
      state.employee = action.payload;
      state.viewLoading = false;
    },
    fetchByIdFailure(state, action) {
      state.viewLoading = false;
      state.error = action.payload;
    },
    deleteRequest: (state) => {
      state.deleteLoading = true;
      state.error = null;
    },
    deleteSuccess: (state, action) => {
      state.successMessage = action.payload;
      state.deleteLoading = false;
    },
    deleteFailure(state, action) {
      state.deleteLoading = false;
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
  fetchByIdFailure,
  fetchByIdRequest,
  fetchByIdSuccess,
  editFailure,
  editRequest,
  editSuccess,
  deleteFailure,
  deleteRequest,
  deleteSuccess
} = counterSlice.actions;

export default counterSlice.reducer;
