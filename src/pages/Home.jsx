import React from "react";
import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setCategoryId,
  setPage,
  setFilters,
} from "../redux/slices/filterSlice";

import { SearchContext } from "../App";
import Categories from "../components/Categories";
import { Pagination } from "../components/Pagination";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Sort from "../components/Sort";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { categoryId, page, limit, sortType, sortList } = useSelector(
    (state) => state.filter
  );
  const sortId = sortType.id;
  const order = sortId.includes("-") ? "asc" : "desc";
  const sortBy = sortId.replace("-", "");

  const { searchValue } = React.useContext(SearchContext);
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);

  const onChangeCategory = React.useCallback((id) => {
    dispatch(setCategoryId(id));
  }, []);

  const onChangePage = (number) => {
    dispatch(setPage(number));
  };

  const fetchPizzas = React.useCallback(() => {
    setLoading(true);

    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `search=${searchValue}` : "";

    axios
      .get(
        `https://6531a2474d4c2e3f333d3049.mockapi.io/pizzas?${category}&${search}&sortBy=${sortBy}&order=${order}&page=${page}&limit=${limit}`
      )
      .then((res) => {
        setPizzas(res.data);
        setLoading(false);
      });
  }, [categoryId, sortType.id, searchValue, page, limit]);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        categoryId,
        page,
        limit,
        sortBy: sortType.id,
        order,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, order, searchValue, page, limit]);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sortBy = sortList.find((obj) => obj.id === params.id);

      dispatch(setFilters({ ...params, sortBy }));

      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    window.scroll(0, 0);

    if (!isSearch.current) {
      fetchPizzas();
    }

    isSearch.current = false;
  }, [fetchPizzas, categoryId, sortType.id, searchValue, page, limit]);

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
        <Sort sortType={sortType} />
      </div>

      <h2 className="content__title">Все пиццы</h2>

      <div className="content__items">
        {isLoading ? skeleton : pizzasBlocks}
      </div>

      <Pagination
        lengthPage={2}
        onChangePage={(number) => onChangePage(number)}
        currentPage={page}
      />
    </div>
  );
}
