import React, { useState, useContext, useEffect } from "react";
import { ShopContext } from "../../context/shop-context";
import { useNavigate } from "react-router-dom";
import { Pencil } from "phosphor-react";
import { Link, useLocation } from "react-router-dom";
import axios from 'axios'

import "./profile.css";

export const Profile = () => {
    const navigate = useNavigate()
    const { activeUser, setActiveUser, isAuthorized, setIsAuthorized } = useContext(ShopContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');   
    
    useEffect(() => {
        if (!isAuthorized) {
            navigate("/login");
        }
    }, [isAuthorized]);

    // const logoutuser = () => {
    //     document.cookie.split(";").forEach(function(cookie) {
    //         document.cookie = cookie.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    //     }); 
    //     setIsAuthorized(false)
    //     setActiveUser(null)
    //     navigate("/login")
    // }

    return (  
        isAuthorized?     
        <div className="profile-wrapper">
            <div className="profile-container">
                <div>
                    <h1 className="profile-header">Профиль</h1>
                    <Pencil className="pencil" size={32} />
                </div>
                <div>
                    <p className="profile-item">Имя: {activeUser.name}</p>
                </div>
                <div>
                    <p className="profile-item">Фамилия: {activeUser.lastname}</p>
                </div>
                <div>
                    <p className="profile-item">E-mail: {activeUser.email}</p>
                </div>
                <div>
                    <p className="profile-item">Номер телефона: {activeUser.phone_number}</p>
                </div>
                <div>
                {/* onClick={logoutuser()} */}
                    <button className="logout-btn">Выйти</button>
                </div>
            </div>
        </div>:<div></div>
    );
}