import { configureStore } from "@reduxjs/toolkit";
import  skillReducer from "../features/tasks/taskslice.js"

export const store = configureStore({
  reducer: {
    task:skillReducer,
  },
});