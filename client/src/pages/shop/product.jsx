import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../../context/shop-context";

export const Product = (props) => {
  const { id, name, price, image } = props.data;
  const { addToCart, cartItems } = useContext(ShopContext);

  const cartItemCount = cartItems[id];

  return (
    <div className="product">
      <Link to={`/product/${id}`} className="product-link">
        <img src={`data:image/png;base64, ${image}`}/>
        <div className="description">
          <p><b>{name}</b></p>
          <p className="price">{price} Р</p>
        </div>
      </Link>
      <button className="addToCartBttn" onClick={() => addToCart(id)}>
        В корзину{cartItemCount > 0 && <> ({cartItemCount})</>}
      </button>
    </div>
  );
};
