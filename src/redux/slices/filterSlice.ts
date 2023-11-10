import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IFilterSliceState from "../../interfaces/IFilterSliceState";
import ISortType from "../../interfaces/ISortType";

export const filterSlice = createSlice({
  name: "filter",
  initialState: <IFilterSliceState>{
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
      id: "rating",
    },
    page: 1,
    limit: 6,
  },
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.page = 1;
      state.searchValue = action.payload;
    },
    setCategoryId(state, action: PayloadAction<number>) {
      state.page = 1;
      state.categoryId = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setSortType(state, action: PayloadAction<ISortType>) {
      state.page = 1;
      state.sortType = action.payload;
    },
    setLimit(state, action: PayloadAction<number>) {
      state.page = 1;
      state.limit = action.payload;
    },
    setFilters(state, action: PayloadAction<IFilterSliceState>) {
      if (Object.keys(action.payload).length) {
        state.page = Number(action.payload.page);
        state.categoryId = Number(action.payload.categoryId);
        state.sortType = action.payload.sortType;
      } else {
        state.page = 1;
        state.categoryId = 0;
        state.sortType = {
          name: "популярности ⇧",
          id: "rating",
        };
      }
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
