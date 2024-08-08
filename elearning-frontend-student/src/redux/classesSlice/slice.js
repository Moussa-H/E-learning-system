import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [], // List of all classes
  enrollList: [], // List of enrolled classes
  unenrollList: [], // List of unenrolled classes
  files: [], // List of files for a class
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
    fetchEnrollments: (state) => {
      state.loading = true;
    },
    loadEnrollments: (state, action) => {
      state.loading = false;
      state.enrollList = action.payload.classes; // Correct payload extraction
    },
    fetchUnenrollments: (state) => {
      state.loading = true;
    },
    loadUnenrollments: (state, action) => {
      state.loading = false;
      state.unenrollList = action.payload.classes; // Correct payload extraction
    },
    fetchFiles: (state) => {
      state.loading = true;
    },
    loadFiles: (state, action) => {
      state.loading = false;
      state.files = action.payload.files; // Correct payload extraction
    },
    error: (state, action) => {
      state.loading = false;
      state.error = action.payload; // Correct payload extraction
    },
  },
});

export const classesSliceSelector = (global) => global.classes;

export const {
  fetchClasses,
  loadClasses,
  fetchEnrollments,
  loadEnrollments,
  fetchUnenrollments,
  loadUnenrollments,
  fetchFiles,
  loadFiles,
  error,
} = classesSlice.actions;
export const classesReducer = classesSlice.reducer;
