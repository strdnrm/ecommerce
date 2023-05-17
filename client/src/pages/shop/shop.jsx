import React, { useContext } from "react";
import { Product } from "./product";
import { ShopContext } from "../../context/shop-context";
import { Navbar } from "../../components/navbar/navbar";

import "./shop.css";

export const Shop = () => {
  const { products } = useContext(ShopContext);
  return (
    <div className="shop">
      <Navbar/>
      <div className="products_container">
        {
          products && products.map((product) => (
            <Product key={product.id} data={product} />
          ))
        }
      </div>
    </div>
  );
};