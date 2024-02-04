import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../redux/slices/cart/slice";
import { SelectorCartItemById } from "../../redux/slices/cart/selectors";
import IProductBlockProps from "../../interfaces/IProduct";

const ProductBlock: React.FC<IProductBlockProps> = ({
  id,
  title,
  price,
  imageUrl,
  materials,
  colors,
}) => {
  const dispatch = useDispatch();
  const cartItem = useSelector(SelectorCartItemById(id));
  const countItem: number = cartItem ? cartItem.count : 0;
  const [activeType, setActiveType] = React.useState<number>(0);
  const [activeColor, setActiveColor] = React.useState<number>(0);
  const materialNames = ["латекс", "пластик"];

  const onClickAdd = () => {
    const item = {
      id,
      title,
      price,
      imageUrl,
      material: materialNames[activeType],
      color: activeColor,
      count: 0,
    };
    dispatch(addItem(item));
  };

  return (
    <div className="product-block__wrapper">
      <div className="product-block">
        <Link to={`/products/${id}`}>
          <img
            className="product-block__image"
            src={`/img/products/${imageUrl}-${activeColor + 1}.jpg`}
            alt="Product"
            loading="lazy"
          />
          <h4 className="product-block__title">{title}</h4>
        </Link>

        <div className="product-block__selector">
          <ul>
            {materials.map((materialId: number) => (
              <li
                onClick={() => setActiveType(materialId)}
                key={materialId}
                className={activeType === materialId ? "active" : ""}
              >
                {materialNames[materialId]}
              </li>
            ))}
          </ul>

          <ul>
            {colors.map((color, i) => (
              <li
                onClick={() => setActiveColor(i)}
                key={i}
                style={{ background: color }}
                className={activeColor === i ? "active color" : "color"}
              ></li>
            ))}
          </ul>
        </div>

        <div className="product-block__bottom">
          <div className="product-block__price">от {price} ₽</div>
          <button
            onClick={onClickAdd}
            className="button button--outline button--add"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {countItem > 0 && <i>{countItem}</i>}
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProductBlock;
