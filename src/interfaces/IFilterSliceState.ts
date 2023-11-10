import ISortType from "./ISortType";

interface IFilterSliceState {
  search: string;
  category: number;
  sortList: ISortType[];
  sortType: ISortType;
  page: number;
  limit: number;
}

export default IFilterSliceState;
