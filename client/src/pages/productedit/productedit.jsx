import React, { useState, useContext } from "react";
import { Productitem } from "./productitem";
import { ShopContext } from "../../context/shop-context";
import { Plus } from "phosphor-react";
import { ProductForm  } from "../../components/productform/productform"

import "./productedit.css";

export const Productedit = () => {
  const { products } = useContext(ShopContext);

  const [isEditing, setIsEditing] = useState(false);

  const handleAddProduct = () => {
    setIsEditing(true);
  };

  const handleSaveProduct = (product) => {
    //send post req
    setIsEditing(false);
  };

  return (
    <div className="product-dashboard-container">
      <div className="products-dashboard">
        {
          products && products.map((product) => (
            <Productitem key={product.id} data={product} />
          ))
        }
        <div className="addproduct" onClick={handleAddProduct}>
            <Plus size={56} />
        </div>
      </div>
      {isEditing && <ProductForm onSave={handleSaveProduct} />}
    </div>
  );
};