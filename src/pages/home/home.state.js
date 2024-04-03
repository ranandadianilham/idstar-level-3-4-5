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
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      console.log("action", action.payload);
      state.value += action.payload;
    },
  },
});

export const { fetchAllDataFailure, fetchAllDataSuccess, fetchAllRequest, increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
