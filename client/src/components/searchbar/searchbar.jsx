import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, UserCircle, Chat, List } from "phosphor-react";
import "./searchbar.css";

export const Searchbar = () => {
  const location = useLocation();

  return (
    <form className="search" action="">
        <input type="search" placeholder="Что вы ищете?" required></input>
        <button type="submit">Искать</button>
    </form>   
  );
};
