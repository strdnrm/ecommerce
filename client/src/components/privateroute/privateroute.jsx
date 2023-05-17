import React, { useContext } from "react";
import { Route, Navigate } from 'react-router-dom';
import { ShopContext } from "../../context/shop-context";
import { Children } from "react";


export const PrivateRoute = ({ children }) => {
    const { isAdmin } = useContext(ShopContext);
    if (isAdmin) {
        return children
    }
    return <Navigate to='/admin' />
}