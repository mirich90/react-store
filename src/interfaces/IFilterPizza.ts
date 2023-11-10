import ISortType from "./ISortType";

interface IFilterPizza {
  search: string;
  category: number;
  sortBy: ISortType;
  page: number;
  limit: number;
  order: "ASC" | "DESC";
}

export default IFilterPizza;
