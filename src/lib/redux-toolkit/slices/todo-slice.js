import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  loading: false,
  error: null,
  filter: "",
  openModal: false,
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setData: (state, { payload }) => {
      state.data = payload;
    },
    addData: (state, { payload }) => {
      state.data.unshift(payload);
    },
    filterData: (state, { payload }) => {
      state.filter = payload;
    },
    isLoading: (state, { payload }) => {
      state.loading = payload;
    },
    isOpenModal: (state) => {
      state.openModal = !state.openModal;
    },
    deleteTodoItem: (state, { payload }) => {
      state.data = state.data.filter((el) => el.id !== payload);
    },
  },
});

export const {
  setData,
  isLoading,
  filterData,
  addData,
  isOpenModal,
  deleteTodoItem,
} = todoSlice.actions;

export default todoSlice.reducer;
