import React, { useEffect, useState } from "react";
import ProductCard from "../../components/card/ProductCard";
import "../../styles/HomePage.scss";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/queryKeys";
import { fetchProductsPublic } from "../../api/index";
import ProductCardSkeleton from "../../components/card/ProductCardSkeleton";

const HomePage: React.FC = () => {
  const { data: products = [] } = useQuery({
    queryKey: [QUERY_KEY.products],
    queryFn: fetchProductsPublic,
  });

  const skeletonCount = Array(5).fill(null);

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 10000);
  }, []);

  return (
    <div className="home-page">
      <h1 className="home-page__title">Our Products</h1>
      <div className="home-page__products">
        {isLoading ? (
          <>
            {skeletonCount.map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </>
        ) : (
          <>
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
