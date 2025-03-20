import React from "react";
import ProductCard from "../components/ProductCard";
import "../styles/HomePage.scss";
import { Product } from "../model/product.model";
import Product1 from "../assets/images/product1.png";
import Product2 from "../assets/images/product2.png";
import Product3 from "../assets/images/product3.png";
import Product4 from "../assets/images/product4.png";
import Product5 from "../assets/images/product5.png";
import Product6 from "../assets/images/product6.png";
import Product7 from "../assets/images/product7.png";
import Product8 from "../assets/images/product8.png";

const products: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation.",
    price: 99.99,
    imageUrl: Product4,
    quantity: 10,
    updateAt: new Date(),
  },
  {
    id: "2",
    name: "Smartphone Stand",
    description: "Adjustable smartphone stand for hands-free use.",
    price: 19.99,
    imageUrl: Product1,
    quantity: 5,
    updateAt: new Date(),
  },
  {
    id: "3",
    name: "Gaming Mouse",
    description: "Ergonomic gaming mouse with customizable buttons.",
    price: 49.99,
    imageUrl: Product2,
    quantity: 8,
    updateAt: new Date(),
  },
  {
    id: "4",
    name: "Portable Charger",
    description: "Compact portable charger with fast charging support.",
    price: 29.99,
    imageUrl: Product3,
    quantity: 15,
    updateAt: new Date(),
  },
  {
    id: "5",
    name: "Bluetooth Speaker",
    description: "Waterproof Bluetooth speaker with excellent sound quality.",
    price: 39.99,
    imageUrl: Product5,
    quantity: 0,
    updateAt: new Date(),
  },
  {
    id: "6",
    name: "Fitness Tracker",
    description: "Track your fitness goals with this stylish fitness tracker.",
    price: 59.99,
    imageUrl: Product6,
    quantity: 20,
    updateAt: new Date(),
  },
  {
    id: "5",
    name: "Bluetooth Speaker",
    description: "Waterproof Bluetooth speaker with excellent sound quality.",
    price: 39.99,
    imageUrl: Product7,
    quantity: 0,
    updateAt: new Date(),
  },
  {
    id: "6",
    name: "Fitness Tracker",
    description: "Track your fitness goals with this stylish fitness tracker.",
    price: 59.99,
    imageUrl: Product8,
    quantity: 20,
    updateAt: new Date(),
  },
];

const HomePage: React.FC = () => {
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
