interface ISortType {
  name: string;
  id: "rating" | "price" | "title" | "-rating" | "-price" | "-title";
}
export default ISortType;
