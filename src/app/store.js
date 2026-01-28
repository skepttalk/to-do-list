import { configureStore } from "@reduxjs/toolkit";
import  taskReducer from "../features/tasks/taskslice.js"

export const store = configureStore({
  reducer: {
    task:taskReducer,
  },
});