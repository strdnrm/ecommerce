import React, { useState, useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import { useNavigate } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import validator from 'validator' 
import axios from 'axios'

import "./register.css";

export const Register = () => {
  const [username, setUsername] = useState('');
  const [lastname, setLastname] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate()

  const validate = () => {
    if(!validator.isEmail(email)) {
        return false
    }
    if(!validator.isMobilePhone(phone)) {
        return false
    }
    if(!validator.isEmail(email)) {
        return false
    }
    return true
  }

  const handleSubmit = async (event) => {
    // if (!validate()) {
    //    return 
    // }

    event.preventDefault();
    try {
      const req = JSON.stringify(
        {
            name: username,
            lastname: lastname,
            email: email,
            phone_number: phone, 
            password: password
        }
      );
      const response = await axios.post('http://localhost:8080/signup', req)
      if (response.status === 201) {
        navigate("/login")
        // document.cookie = `session=${response.data}`;
      } else if (response.data) {
        console.error('Ошибка аутентификации');
      }

    } catch (error) {
      console.error(error);
    };
  }

    return (
      <div className="form-container">
        <form className="register-form" onSubmit={handleSubmit}>
        <p className="form-header">Регистрация</p>
        <div>            
          <p className="input-name">Имя:</p>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>            
          <p className="input-name">Фамилия:</p>
          <input
            type="text"
            id="lastname"
            value={lastname}
            onChange={(event) => setLastname(event.target.value)}
          />
        </div>
        <div>            
            {/* + validator.isEmail(email)?"error-field":""} */}
          <p className="input-name">Email:</p>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>         
          <p className="input-name">Номер телефона:</p>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
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
        <button type="submit">Зарегистрироваться</button>
        <Link to="/login" className="register-link">
          Войти
        </Link>
        </form>
      </div>
    );
  }