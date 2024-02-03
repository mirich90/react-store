import React from "react";
import { useSelector } from "react-redux";
import { setCategory, setPage } from "../redux/slices/filter/slice";

import Categories from "../components/Categories";
import { Pagination } from "../components/Pagination";
import ProductBlock from "../components/ProductBlock";
import Skeleton from "../components/ProductBlock/Skeleton";
import Sort from "../components/Sort";
import { fetchProducts } from "../redux/slices/product/slice";
import IProductBlockProps from "../interfaces/IProduct";
import { RootState, useAppDispatch } from "../redux/store";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  const { items: products, status } = useSelector(
    (state: any) => state.product
  );
  const { category, page, limit, sortType, search } = useSelector(
    (state: RootState) => state.filter
  );

  // mockapi.io возвращает headers["x-total-count"] только на платном тарифе, поэтому хардкодим
  const getCategory = () => {
    switch (category) {
      case 1:
        return 3;
      case 2:
        return 1;
      case 3:
        return 1;
      default:
        return 4;
    }
  };

  const sortId = sortType.id;
  const order = sortId.includes("-") ? "asc" : "desc";
  const sortBy = sortId.replace("-", "");

  const onChangeCategory = React.useCallback((id: number) => {
    dispatch(setCategory(id));
  }, []);

  const onChangePage = (pageId: number) => {
    dispatch(setPage(pageId));
  };

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

    getProducts();
  }, [category, sortType.id, search, page, limit]);

  const productsBlocks = products.map((product: IProductBlockProps) => (
    <ProductBlock {...product} key={product.id} />
  ));

  const skeleton = [...new Array(1)].map((_, i) => <Skeleton key={i} />);

  return (
    <div className="container">
      <div className="content__header">
        <h1>Японские маски по демократичной цене</h1>
        <p>
          Японские маски Oni, Samurai, Hannya. В нашем магазине вы найдете
          традиционные японские маски самого высокого качества.
        </p>
      </div>

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
        lengthPage={getCategory()}
        onChangePage={(pageId: number) => onChangePage(pageId)}
        currentPage={page}
      />
    </div>
  );
};

export default Home;
