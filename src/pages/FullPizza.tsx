import axios from "axios";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const FullPizza: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>({
    imageUrl: "",
    title: "",
    price: 0,
  });

  React.useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const { data } = await axios.get(
          `https://6531a2474d4c2e3f333d3049.mockapi.io/pizzas/${id}`
        );
        setPizza(data);
      } catch (error) {
        alert("Ошибка при получении пиццы");
        navigate("/");
      }
    };
    fetchPizzas();
  }, []);

  return (
    <div>
      <img src={pizza.imageUrl} />
      {pizza.title}
    </div>
  );
  // return <div>   <PizzaBlock {...pizza}  /></div>;
};

export default FullPizza;
