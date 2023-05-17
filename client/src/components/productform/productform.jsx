import React, { useState, useContext, useCallback } from "react";
import { ShopContext } from "../../context/shop-context";
import { useNavigate } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import { Backspace } from "phosphor-react";
import axios from 'axios'

import "./productform.css";

export const ProductForm = (props) => {
    const { setActiveUser, setIsAuthorized } = useContext(ShopContext);

    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [category, setCategory] = useState('');

    const handleSubmitEdit = async (event) => {
        event.preventDefault();
        try {
            const req = JSON.stringify(
              {
                name: name,
                image: image,
                description: description,
                price: price, 
                quantity: quantity,
                category: category
              }
            );
            console.log(req)
            // console.log(req.name)
            // console.log(req.price)
            // console.log(req.quantity)
            const response = await axios.post('http://localhost:8080/product/create', req,
              { 
                withCredentials: true,
                headers: { 'Content-Type': 'application/json'}//'Access-Control-Allow-Origin': '*',
              }
            )
            if (response.status === 201) {
              console.log("added")
            } else {
              console.error('create error');
            }      
        } catch (error) {
            console.error(error);
        };
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
              const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
              setImage(base64String);
              console.log(base64String)
            };
        }        
    };

    const handlePriceChange = (e) => {
        const priceValue = parseFloat(e.target.value);
        setPrice(priceValue);
    };

    const handleQuantityChange = (e) => {
        const quantityValue = parseInt(e.target.value, 10);
        setQuantity(quantityValue);
    };

    return (
        <div className="form-product-container">
            <form className="form-product" onSubmit={handleSubmitEdit}>
                <Backspace className="backspace" size={52} />
                <div className="edit-item">
                    <p>Картинка</p>
                    <input type="file" onChange={handleImageChange} />
                    {image && <img src={`data:image/png;base64,${image}`} />}
                </div>
                <div className="edit-item">
                    <p>Название</p>
                    <input
                    type="text"
                    id="name-edit"
                    onChange={(event) => setName(event.target.value)}
                    />
                </div>
                <div className="edit-item">
                    <p>Категория</p>
                    <input
                    type="text"
                    id="name-edit"
                    onChange={(event) => setCategory(event.target.value)}
                    />
                </div>
                <div className="edit-item">
                    <p>Описание</p>
                    <textarea
                    id="name-edit"
                    onChange={(event) => setDescription(event.target.value)}
                    />
                </div>
                <div className="edit-item">
                    <p>Цена</p>
                    <input
                    type="text"
                    id="name-edit"
                    onChange={handlePriceChange}//(event) => setPrice(event.target.value)
                    />
                </div>
                <div className="edit-item">
                    <p>Количество на складе</p>
                    <input
                    type="text"
                    id="name-edit"
                    onChange={handleQuantityChange}//(event) => setQuantity(event.target.value)
                    />
                </div>
                <button type="submit">Создать</button>
            </form>
        </div>
    );
}