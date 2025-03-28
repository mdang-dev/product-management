import React from "react";
import ProductCard from "../../components/ProductCard";
import "../../styles/HomePage.scss";
import { Product } from "../../models/product.model";
import Product1 from "../../assets/images/product1.png";
import Product2 from "../../assets/images/product2.png";
import Product3 from "../../assets/images/product3.png";
import Product4 from "../../assets/images/product4.png";
import Product5 from "../../assets/images/product5.png";
import Product6 from "../../assets/images/product6.png";
import Product7 from "../../assets/images/product7.png";
import Product8 from "../../assets/images/product8.png";
import { useProductsQuery } from "../../store/productStore";

const HomePage: React.FC = () => {
  const { fetchProducts } = useProductsQuery();

  const { data: products = [] } = fetchProducts;

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
