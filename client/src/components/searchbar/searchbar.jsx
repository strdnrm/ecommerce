import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShopContext } from "../../context/shop-context";
import { ShoppingCart, UserCircle, Chat, List } from "phosphor-react";
import "./searchbar.css";

export const Searchbar = () => {
  const { handlerSearchInput } = useContext(ShopContext);

  return (
    <form className="search" action="">
        <input  type="search" placeholder="Что вы ищете?" onChange={handlerSearchInput} required></input>
        {/* <button className="search-button" type="submit">Искать</button> */}
    </form>   
  );
};
