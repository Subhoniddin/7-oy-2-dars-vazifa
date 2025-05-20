import { configureStore } from "@reduxjs/toolkit";
import todo from "./slices/todo-slice";
export const store = configureStore({
  reducer: {
    todo,
  },
});
