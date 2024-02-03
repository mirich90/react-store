import React from "react";
import ICategoriesProps from "../interfaces/ICategoriesProps";
import useWhyDidYouUpdate from "ahooks/lib/useWhyDidYouUpdate";

const Categories: React.FC<ICategoriesProps> = ({
  value,
  onChangeCategory,
}) => {
  useWhyDidYouUpdate("Categories", {
    value,
    onChangeCategory,
  });

  const categories = ["Все", "Oni", "Samurai", "Hannya", "Kitsune"];

  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => (
          <li
            key={index}
            className={value === index ? "active" : ""}
            onClick={() => onChangeCategory(index)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default React.memo(Categories);
