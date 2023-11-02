import React from "react";
import Categories from "../components/Categories";
import { Pagination } from "../components/Pagination";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Sort from "../components/Sort";

export default function Home({ searchValue, setSearchValue }) {
  const [pizzas, setPizzas] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [isLoading, setLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState({
    name: "популярности ⇧",
    id: "raiting",
  });

  React.useEffect(() => {
    setLoading(true);

    const order = sortType.id.includes("-") ? "asc" : "desc";
    const sortBy = sortType.id.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `search=${searchValue}` : "";
    const limit = 6;

    fetch(
      `https://6531a2474d4c2e3f333d3049.mockapi.io/pizzas?${category}&${search}&sortBy=${sortBy}&order=${order}&page=${currentPage}&limit=${limit}`
    )
      .then((res) => res.json())
      .then((arr) => {
        setPizzas(arr);
        setLoading(false);
      });
    window.scroll(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizzasBlocks = pizzas.map((pizza) => (
    <PizzaBlock {...pizza} key={pizza.id} />
  ));

  const skeleton = [...new Array(1)].map((_, i) => <Skeleton key={i} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onChangeCategory={(i) => setCategoryId(i)}
        />
        <Sort value={sortType} onChangeSort={(i) => setSortType(i)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading ? skeleton : pizzasBlocks}
      </div>
      <Pagination
        lengthPage={2}
        onChangePage={(number) => setCurrentPage(number)}
      />
    </div>
  );
}
