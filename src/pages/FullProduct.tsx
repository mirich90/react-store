import axios from "axios";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const FullProduct: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>({
    imageUrl: "",
    title: "",
    price: 0,
  });

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(
          `https://65b7b40246324d531d55478c.mockapi.io/products/${id}`
        );
        setProduct(data);
      } catch (error) {
        alert("Ошибка при получении масок");
        navigate("/");
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <img src={product.imageUrl} />
      {product.title}
    </div>
  );
  // return <div>   <ProductBlock {...product}  /></div>;
};

export default FullProduct;
