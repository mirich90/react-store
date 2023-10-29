import React from "react";
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Sort from "../components/Sort";

export default function Home() {
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch("https://6531a2474d4c2e3f333d3049.mockapi.io/pizzas")
      .then((res) => res.json())
      .then((arr) => {
        setPizzas(arr);
        setLoading(false);
      });
  }, []);
  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(8)].map((_, i) => <Skeleton key={i} />)
          : pizzas.map((pizza) => <PizzaBlock {...pizza} key={pizza.id} />)}
      </div>
    </>
  );
}
