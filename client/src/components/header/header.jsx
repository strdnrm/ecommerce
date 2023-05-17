import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, UserCircle, Chat, List } from "phosphor-react";
import "./header.css";

export const Header = () => {
  const location = useLocation();

  return (
    <div className="header">
      <div className="logo">
        <Link to="/" id="NavTitle">
          Online shop
        </Link>
      </div>
      <div className="links">

        <Link to="/" className={location.pathname === "/" ? "active-link" : ""}>
          <List size={32} />
          <p>Каталог</p>          
        </Link>

        <Link to="/contact" className={location.pathname === "/contact" ? "active-link" : ""}>
          <Chat size={32} />
          <p>Обращения</p>
        </Link>

        <Link to="/cart" id="cartlink" className={location.pathname === "/cart" ? "active-link" : ""}>
          <ShoppingCart size={32} />
          <p>Корзина</p>  
        </Link>

        <Link to="/profile" className={location.pathname === "/profile" ? "active-link" : ""}>
          <UserCircle size={32} />
          <p>Профиль</p>  
        </Link>
        
      </div>
    </div>
  );
};
