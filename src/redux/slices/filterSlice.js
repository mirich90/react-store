import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
  name: "filter",
  initialState: {
    categoryId: 0,
    sortList: [
      { name: "популярности ⇩", id: "rating" },
      { name: "популярности ⇧", id: "-rating" },
      { name: "цене ⇩", id: "price" },
      { name: "цене ⇧", id: "-price" },
      { name: "алфавиту ⇩", id: "title" },
      { name: "алфавиту ⇧", id: "-title" },
    ],
    sortType: {
      name: "популярности ⇧",
      id: "raiting",
    },
    page: 1,
    limit: 6,
  },
  reducers: {
    setCategoryId(state, action) {
      state.page = 1;
      state.categoryId = action.payload;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    setSortType(state, action) {
      state.page = 1;
      state.sort = action.payload;
    },
    setLimit(state, action) {
      state.page = 1;
      state.sort = action.payload;
    },
    setFilters(state, action) {
      state.sort = action.payload.sort;
      state.page = Number(action.payload.page);
      state.categoryId = Number(action.payload.categoryId);
    },
  },
});

export const { setCategoryId, setPage, setSortType, setLimit, setFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
