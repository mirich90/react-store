import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
  name: "filter",
  initialState: {
    searchValue: "",
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
    setSearchValue(state, action) {
      state.page = 1;
      state.searchValue = action.payload;
    },
    setCategoryId(state, action) {
      state.page = 1;
      state.categoryId = action.payload;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    setSortType(state, action) {
      state.page = 1;
      state.sortType = action.payload;
    },
    setLimit(state, action) {
      state.page = 1;
      state.limit = action.payload;
    },
    setFilters(state, action) {
      state.sortType = action.payload.sort;
      state.page = Number(action.payload.page);
      state.categoryId = Number(action.payload.categoryId);
    },
  },
});

export const {
  setCategoryId,
  setPage,
  setSortType,
  setLimit,
  setFilters,
  setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
