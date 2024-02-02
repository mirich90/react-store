import React from "react";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { setCategory, setPage, setFilters } from "../redux/slices/filter/slice";

import Categories from "../components/Categories";
import { Pagination } from "../components/Pagination";
import ProductBlock from "../components/ProductBlock";
import Skeleton from "../components/ProductBlock/Skeleton";
import Sort from "../components/Sort";
import { fetchProducts } from "../redux/slices/product/slice";
import ISortType from "../interfaces/ISortType";
import IProductBlockProps from "../interfaces/IProduct";
import { RootState, useAppDispatch } from "../redux/store";
import ISort from "../interfaces/ISortId";
import SortTypeDefault from "../interfaces/ISortTypeDefault";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = React.useRef<boolean>(false);
  const isMounted = React.useRef<boolean>(false);

  const { items: products, status } = useSelector(
    (state: any) => state.product
  );
  const { category, page, limit, sortType, search } = useSelector(
    (state: RootState) => state.filter
  );

  const sortId = sortType.id;
  const order = sortId.includes("-") ? "asc" : "desc";
  const sortBy = sortId.replace("-", "");

  const onChangeCategory = React.useCallback((id: number) => {
    dispatch(setCategory(id));
  }, []);

  const onChangePage = (pageId: number) => {
    dispatch(setPage(pageId));
  };

  // React.useEffect(() => {
  //   if (isMounted.current) {
  //     const queryString = qs.stringify({
  //       category,
  //       page,
  //       limit,
  //       sortBy: sortType.id,
  //       order,
  //     });
  //     navigate(`?${queryString}`);
  //   }
  //   isMounted.current = true;
  // }, [category, sortType, order, search, page, limit]);

  // React.useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(window.location.search.substring(1));
  //     const sortType =
  //       sortList.find((obj: ISortType) => obj.id === params.id) || SortTypeDefault;

  //     dispatch(setFilters({ ...params, sortType }));

  //     isSearch.current = true;
  //   }
  // }, []);

  React.useEffect(() => {
    window.scroll(0, 0);

    const getProducts = async () => {
      const categoryId = category > 0 ? `category=${category}` : "";
      const searchValue = search ? `search=${search}` : "";
      const materialOrder = order.toUpperCase();

      dispatch(
        fetchProducts({
          order: materialOrder,
          sortBy,
          category: String(categoryId),
          search: searchValue,
          page: String(page),
          limit: String(limit),
        })
      );
    };

    // if (!isSearch.current) {
    getProducts();
    // }

    // isSearch.current = false;
  }, [category, sortType.id, search, page, limit]);

  const productsBlocks = products.map((product: IProductBlockProps) => (
    <ProductBlock {...product} key={product.id} />
  ));

  const skeleton = [...new Array(1)].map((_, i) => <Skeleton key={i} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={category} onChangeCategory={onChangeCategory} />
        <Sort sortType={sortType} />
      </div>

      <h2 className="content__title">Все маски</h2>

      {status === "error" ? (
        <div>
          <h3>Произошла ошибка </h3>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeleton : productsBlocks}
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
