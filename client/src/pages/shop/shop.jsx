import React, { useContext } from "react";
import { Product } from "./product";
import { ShopContext } from "../../context/shop-context";
import { Navbar } from "../../components/navbar/navbar";

import "./shop.css";

export const Shop = () => {
  const { searchText, products, choosenCategory, sortPrice } = useContext(ShopContext);
  const filteredProducts = products.filter((el) => {    
    if (searchText === '') {
        return el;
    }
    else {
        return el.name.toLowerCase().includes(searchText)
    }
  })

  const sortedProducts = () => {
    let sorted = filteredProducts;
  
    if (sortPrice === 1) {
      sorted = filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortPrice === 2) {
      sorted = filteredProducts.sort((a, b) => b.price - a.price);
    }
    return sorted
  }

  let sorted = sortedProducts();

  return (
    <div className="shop">
      <Navbar/>
      <div className="products_container">
        {
          choosenCategory === "Все" ? (
            sorted && sorted.map((product) => 
              <Product key={product.id} data={product} />
            )
          ) : (
            filteredProducts && filteredProducts.map((product) => (
              product.category === choosenCategory) ? <Product key={product.id} data={product} /> : null
            )
          )
        }
      </div>
    </div>
  );
};