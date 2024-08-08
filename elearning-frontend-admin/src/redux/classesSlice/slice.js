import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [], // List of all classes
  error: "",
  loading: false,
};

const classesSlice = createSlice({
  name: "classes",
  initialState,
  reducers: {
    fetchClasses: (state) => {
      state.loading = true;
    },
    loadClasses: (state, action) => {
      state.loading = false;
      state.list = action.payload.classes; // Correct payload extraction
    },
    error: (state, action) => {
      state.loading = false;
      state.error = action.payload; // Correct payload extraction
    },
  },
});

export const classesSliceSelector = (global) => global.classes;

export const { fetchClasses, loadClasses, error } = classesSlice.actions;
export const classesReducer = classesSlice.reducer;
