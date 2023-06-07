import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import { Searchbar } from "../searchbar/searchbar";
import { SortDescending , SortAscending  } from "phosphor-react";

import "./navbar.css";


export const Navbar = () => {
  const { categories, setChoosenCategory, sortPrice, setSortPrice } = useContext(ShopContext);

  // const chooseCategory = (category) => {
  //   // console.log("cu" + category)
  //   setChoosenCategory(category)
  // } 

  const chooseSort = (sortType) => {
    if (sortPrice === sortType) {
      setSortPrice(0)
      return
    }
    setSortPrice(sortType)
  }

  return (
    <div className="navbar">
      <div className="navbar-head">
        <Searchbar/>
        <div className="sort-container">
          <div className="sort-item" onClick={() => chooseSort(1)}>
            <SortDescending size={32} />
            <p className="sort-price">Цена</p>
          </div>
          <div className="sort-item">
            <SortAscending size={32} onClick={() => chooseSort(2)}/>
            <p className="sort-price">Цена</p>
          </div>         
        </div>
      </div>

      <div className="categories">
          {
            categories && categories.map((e) => (
              <div className="category" onClick={() => {setChoosenCategory(e)}}>{e}</div>
            ))
          }
      </div>
    </div>
  );
};
