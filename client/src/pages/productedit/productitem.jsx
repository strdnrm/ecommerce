import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../../context/shop-context";
import { Pencil, TrashSimple } from "phosphor-react";

export const Productitem = (props) => {
  const { id, name, price, image, description, category  } = props.data;
  const { addToCart, cartItems } = useContext(ShopContext);

  const cartItemCount = cartItems[id];

  return (
    <div className="productitem">
      <Pencil className="pencil-edit" size={32} />
      <TrashSimple className="delete-edit" size={32} />
      <div className="product-wrapper">
        <img src={`data:image/png;base64, ${image}`}/>
        <div>
          <p className="option-header">Название:</p>
          <p>{name}</p>
        </div>
        <div>
          <p className="option-header">Описание:</p>
          <p>{description}</p>
        </div>
        <div>
          <p className="option-header">Категория:</p>
          <p>{category}</p>
        </div>
        <div>
          <p className="option-header">Цена:</p>
          <p className="price">{price} Р</p>
        </div>   
      </div>   
    </div>
  );
};
