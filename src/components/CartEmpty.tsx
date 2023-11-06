import { Link } from "react-router-dom";
import imageSrc from "../assets/img/empty-cart.png";

export const CartEmpty = () => {
  return (
    <div className="container container--cart">
      <div className="cart cart--empty">
        <h2>
          Корзина пустая <span>😕</span>
        </h2>
        <p>
          Вероятней всего, вы не заказывали ещё пиццу.
          <br />
          Для того, чтобы заказать пиццу, перейди на главную страницу.
        </p>
        <img src={imageSrc} alt="Empty cart" />
        <Link className="button button--black" to="/">
          <span>Вернуться назад</span>
        </Link>
      </div>
    </div>
  );
};
