import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCategoryId, setCurrentPage } from "../redux/slices/filterSlice";

import { SearchContext } from "../App";
import Categories from "../components/Categories";
import { Pagination } from "../components/Pagination";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Sort from "../components/Sort";

export default function Home() {
  const dispatch = useDispatch();
  const { categoryId, currentPage, limit, sort } = useSelector(
    (state) => state.filter
  );
  const sortId = sort.id;

  const { searchValue } = React.useContext(SearchContext);
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };
  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  React.useEffect(() => {
    setLoading(true);

    const order = sortId.includes("-") ? "asc" : "desc";
    const sortBy = sortId.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `search=${searchValue}` : "";

    fetch(
      `https://6531a2474d4c2e3f333d3049.mockapi.io/pizzas?${category}&${search}&sortBy=${sortBy}&order=${order}&page=${currentPage}&limit=${limit}`
    )
      .then((res) => res.json())
      .then((arr) => {
        setPizzas(arr);
        setLoading(false);
      });
    window.scroll(0, 0);
  }, [categoryId, sortId, searchValue, currentPage, limit]);

  const pizzasBlocks = pizzas.map((pizza) => (
    <PizzaBlock {...pizza} key={pizza.id} />
  ));

  const skeleton = [...new Array(1)].map((_, i) => <Skeleton key={i} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onChangeCategory={(i) => onChangeCategory(i)}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading ? skeleton : pizzasBlocks}
      </div>
      <Pagination
        lengthPage={2}
        onChangePage={(number) => onChangePage(number)}
      />
    </div>
  );
}
