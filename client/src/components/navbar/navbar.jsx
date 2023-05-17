import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, UserCircle, Chat, List } from "phosphor-react";
import { Searchbar } from "../searchbar/searchbar";
import { SortDescending , SortAscending  } from "phosphor-react";

import "./navbar.css";

export const Navbar = () => {
  const location = useLocation();

  return (
    <div className="navbar">
        <Searchbar/>
        <p className="sort-price"><SortDescending size={32} />Цена</p>
        <div className="categories">
            <div className="category">Ноутбуки</div>
            <div className="category">Мониторы</div>
            <div className="category">Наушники</div>
            <div className="category">Видеокарты</div>
        </div>
    </div>
  );
};
