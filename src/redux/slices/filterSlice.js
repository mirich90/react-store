import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
  name: "filter",
  initialState: {
    categoryId: 0,
    sort: {
      name: "популярности ⇧",
      id: "raiting",
    },
    currentPage: 1,
    limit: 6,
  },
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setLimit(state, action) {
      state.sort = action.payload;
    },
  },
});

export const { setCategoryId, setCurrentPage, setSort, setLimit } =
  filterSlice.actions;

export default filterSlice.reducer;
