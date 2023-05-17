import React, { useState, useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import { useNavigate } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import axios from 'axios'

import "./admin.css";

export const Admin = () => {
  const { isAdmin, setIsAdmin } = useContext(ShopContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const req = JSON.stringify(
        { 
          email: email, 
          password: password
        }
      );
      const response = await axios.post('http://localhost:8080/admin', req,
        { 
          withCredentials: true,
          headers: { 'Content-Type': 'application/json'}//'Access-Control-Allow-Origin': '*',
        }
      )
      if (response.status === 200) {
        setIsAdmin(true)
        navigate("/productedit")
      } else {
        console.error('Ошибка аутентификации');
      }

    } catch (error) {
      console.error(error);
    };
  }

    return (
      <div className="form-container">
        <form onSubmit={handleSubmit}>
        <p className="form-header">Вход</p>
          <div>            
            <p className="input-name">Email:</p>
            <input
              type="text"
              id="username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div>
            <p className="input-name">Пароль:</p>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button type="submit">Войти</button>
        </form>
      </div>
    );
  }