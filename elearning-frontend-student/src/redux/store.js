import { configureStore } from "@reduxjs/toolkit";
import { classesReducer } from "./classesSlice/slice";


const store = configureStore({
  reducer: {
    classes: classesReducer,
  },
});

export default store;
