import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../../context/shop-context";
import "./productDetails.css";

export const ProductDetails = () => {
  const { id } = useParams();
  const { products, addToCart, cartItems } = useContext(ShopContext);

  const cartItemCount = cartItems[id];

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return <div>Товар не найден</div>;
  }

  const { name, description, image, price } = product;

  return (
    <div className="product-container">
      <div className="product-image-container">
        <img src={`data:image/png;base64, ${image}`} alt={name} className="product-image" />
      </div>
      <div className="product-details-container">
        <h1 className="product-name">{name}</h1>
        <div className="product-details">
            <p>
              {description}
            </p>
            <p className="price">{price} Р</p>
            <button className="addToCartBttn" onClick={() => addToCart(id)}>
              В корзину{cartItemCount > 0 && <> ({cartItemCount})</>}
            </button>
        </div>
      </div>
    </div>
  );
};
