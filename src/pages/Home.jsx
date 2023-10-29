import React from "react";
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Sort from "../components/Sort";

export default function Home() {
  const [pizzas, setPizzas] = React.useState([]);
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

    fetch(
      `https://6531a2474d4c2e3f333d3049.mockapi.io/pizzas?${category}&sortBy=${sortBy}&order=${order}`
    )
      .then((res) => res.json())
      .then((arr) => {
        setPizzas(arr);
        setLoading(false);
      });
    window.scroll(0, 0);
  }, [categoryId, sortType]);

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
        {isLoading
          ? pizzas.map((_, i) => <Skeleton key={i} />)
          : pizzas.map((pizza) => <PizzaBlock {...pizza} key={pizza.id} />)}
      </div>
    </div>
  );
}
