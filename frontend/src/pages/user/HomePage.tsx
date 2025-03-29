import React, { CSSProperties } from "react";
import ProductCard from "../../components/ProductCard";
import "../../styles/HomePage.scss";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/queryKeys";
import { fetchProducts } from "../../api/index";

const HomePage: React.FC = () => {
  const { data: products = [] } = useQuery({
    queryKey: [QUERY_KEY.products],
    queryFn: fetchProducts,
  });

  return (
    <div className="home-page">
      <h1 className="home-page__title">Our Products</h1>
      <div className="home-page__products">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
