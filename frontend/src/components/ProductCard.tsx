import React from "react";
import "../styles/ProductCard.scss";
import { Product } from "../model/product.model";

const ProductCard: React.FC<Product> = ({
  name,
  description,
  price,
  imageUrl,
  quantity,
  updateAt,
}) => {
  return (
    <div className="product-card">
      <img src={imageUrl} alt={name} className="product-card__image" />
      <div className="product-card__content">
        <h3 className="product-card__title">{name}</h3>
        <p className="product-card__description">{description}</p>
        <div className="product-card__details">
          <span className="product-card__quantity">
            {quantity > 0 ? `Stock: ${quantity}` : "Out of Stock"}
          </span>
        </div>
        <div className="product-card__footer">
          <span className="product-card__price">${price!.toFixed(2)}</span>
          <button
            className="product-card__button"
            disabled={quantity === 0} // Disable button if out of stock
          >
            Add to Cart
          </button>
        </div>
        <p className="product-card__update">
          Last updated: {new Date(updateAt!).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
