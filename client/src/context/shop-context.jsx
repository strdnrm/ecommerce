import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import userEvent from "@testing-library/user-event";
export const ShopContext = createContext(null);

export const ShopContextProvider = (props) => {
  const [products, setProducts] = useState(
    []
  );

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:8080/product/list');
        const data = response.data.map((item, i) => ({
          id: i+1,
          uuid: item.id,
          image: item.image,
          name: item.name,
          description: item.description,
          price: item.price,
          category: item.category,
        }));
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    }
  
    fetchData();
  }, []);  

  const getDefaultCart = () => {
    let cart = {};
    for (let i = 1; i < products.length + 1; i++) {
      cart[i] = 0;
    }
    return cart;
  };
  
  const [cartItems, setCartItems] = useState({});//getDefaultCart()

  const [activeUser, setActiveUser] = useState();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:8080/private/whoami',        
          { 
            withCredentials: true,
            credentials: 'include'
          }
        );
        // console.log(response.data.user)
        setActiveUser(response.data.user);
        console.log(response.data.user);
        setIsAuthorized(true);
      } catch (error) {
        console.log(error);
      }
    }
  
    fetchData();
  }, []);  

  useEffect(() => {
    if (products.length > 0) {
      setCartItems(getDefaultCart());
    }
  }, [products]);
  
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = products.find((product) => product.id === Number(item));
        totalAmount += cartItems[item] * itemInfo.price;
      }
    }
    return totalAmount;
  };

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const updateCartItemCount = (newAmount, itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
  };

  const checkout = () => {
    setCartItems(getDefaultCart());
  };

  const addProduct = (newProduct) => {
    setProducts([...products, newProduct])
  };

  const removeProduct = (id) => {
    const updatedProducts = products.filter(
      product => product.id !== id
    );
    setProducts(updatedProducts)
  } 

  const contextValue = {
    cartItems,
    addToCart,
    activeUser,
    setActiveUser,
    isAuthorized,
    setIsAuthorized,
    updateCartItemCount,
    removeFromCart,
    getTotalCartAmount,
    checkout,
    products,
    addProduct,
    removeProduct,
    isAdmin,
    setIsAdmin,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};