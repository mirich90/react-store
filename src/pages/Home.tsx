import React from "react";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setCategoryId,
  setPage,
  setFilters,
} from "../redux/slices/filterSlice";

import Categories from "../components/Categories";
import { Pagination } from "../components/Pagination";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Sort from "../components/Sort";
import { fetchPizzas } from "../redux/slices/pizzaSlice";
import ISortType from "../interfaces/ISortType";
import ISearch from "../interfaces/ISearch";
import IPizzaBlockProps from "../interfaces/IPizzaBlockProps";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef<boolean>(false);
  const isMounted = React.useRef<boolean>(false);

  const { items: pizzas, status } = useSelector((state: any) => state.pizza);
  const { categoryId, page, limit, sortType, sortList, searchValue } =
    useSelector((state: any) => state.filter);

  const sortId = sortType.id;
  const order = sortId.includes("-") ? "asc" : "desc";
  const sortBy = sortId.replace("-", "");

  const onChangeCategory = React.useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);

  const onChangePage = (pageId: number) => {
    dispatch(setPage(pageId));
  };

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
      const sortBy = sortList.find((obj: ISortType) => obj.id === params.id);

      dispatch(setFilters({ ...params, sortBy }));

      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    window.scroll(0, 0);

    const getPizzas = async () => {
      const category = categoryId > 0 ? `category=${categoryId}` : "";
      const search = searchValue ? `search=${searchValue}` : "";

      dispatch(
        // @ts-ignore
        fetchPizzas({ order, sortBy, category, search, page, limit })
      );
    };

    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sortType.id, searchValue, page, limit]);

  const pizzasBlocks = pizzas.map((pizza: IPizzaBlockProps) => (
    <PizzaBlock {...pizza} key={pizza.id} />
  ));

  const skeleton = [...new Array(1)].map((_, i) => <Skeleton key={i} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onChangeCategory={(i: number) => onChangeCategory(i)}
        />
        <Sort sortType={sortType} />
      </div>

      <h2 className="content__title">Все пиццы</h2>

      {status === "error" ? (
        <div>
          <h3>Произошла ошибка </h3>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeleton : pizzasBlocks}
        </div>
      )}

      <Pagination
        lengthPage={2}
        onChangePage={(pageId: number) => onChangePage(pageId)}
        currentPage={page}
      />
    </div>
  );
};

export default Home;
