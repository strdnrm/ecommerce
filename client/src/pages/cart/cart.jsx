import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
// import { PRODUCTS } from "../../products";
import { CartItem } from "./cart-item";
import { useNavigate } from "react-router-dom";

import "./cart.css";
export const Cart = () => {
  const { products, cartItems, getTotalCartAmount, checkout } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();

  const navigate = useNavigate();

  return (
    <div className="cart">
      <div className="cart-header">
        <h1>Ваша корзина</h1>
      </div>
      <div className="cart">
        {products.map((product) => {
          if (cartItems[product.id] !== 0 ) {//&& !isNaN(cartItems[product.id])
            return <CartItem key={product.id} data={product} />;
          }
        })}
      </div>

      {totalAmount > 0 ? (
        <div className="checkout">
          <div className="subtotal">
          <h2>Всего: {totalAmount.toLocaleString()} Р</h2>
          </div>
          <div className="buttons">
            <button onClick={() => navigate("/")}>В каталог</button>
            <button onClick={() => {checkout(); navigate("/checkout");}}>
              Купить
            </button>
          </div>
        </div>

      ) : (
        <h1 className="empty-cart">Корзина пуста</h1>
      )}
    </div>
  );
};