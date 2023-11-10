import ISortType from "./ISortType";

interface IFilterSliceState {
  searchValue: string;
  categoryId: number;
  sortList: ISortType[];
  sortType: ISortType;
  page: number;
  limit: number;
}

export default IFilterSliceState;
