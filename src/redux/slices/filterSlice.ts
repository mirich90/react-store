import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IFilterSliceState from "../../interfaces/IFilterSliceState";
import ISortId from "../../interfaces/ISortId";
import ISortName from "../../interfaces/ISortName";
import ISortType from "../../interfaces/ISortType";
import SortTypeDefault from "../../interfaces/ISortTypeDefault";

export const filterSlice = createSlice({
  name: "filter",
  initialState: {
    search: "",
    category: 0,
    sortList: [
      { name: ISortName.RATING_DESC, id: ISortId.RATING_DESC },
      { name: ISortName.RATING_ASC, id: ISortId.RATING_ASC },
      { name: ISortName.PRICE_DESC, id: ISortId.PRICE_DESC },
      { name: ISortName.PRICE_ASC, id: ISortId.PRICE_ASC },
      { name: ISortName.TITLE_DESC, id: ISortId.TITLE_DESC },
      { name: ISortName.TITLE_ASC, id: ISortId.TITLE_ASC },
    ],
    sortType: SortTypeDefault,
    page: 1,
    limit: 6,
  } as IFilterSliceState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.page = 1;
      state.search = action.payload;
    },
    setCategory(state, action: PayloadAction<number>) {
      state.page = 1;
      state.category = action.payload;
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
        state.category = Number(action.payload.category);
        state.sortType = action.payload.sortType;
      } else {
        state.page = 1;
        state.category = 0;
        state.sortType = {
          name: "популярности ⇧",
          id: ISortId.RATING_DESC,
        };
      }
    },
  },
});

export const {
  setCategory,
  setPage,
  setSortType,
  setLimit,
  setFilters,
  setSearch,
} = filterSlice.actions;

export default filterSlice.reducer;
