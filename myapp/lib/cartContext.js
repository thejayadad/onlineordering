'use client'
// cartContext.js
import { createContext, useContext, useState } from 'react';

const cartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  const addToCart = (newItem) => {
    setCartItems((prev) => {
      const itemExists = prev.find((item) => item._id === newItem._id);

      if (itemExists) {
        const updatedItem = { ...itemExists, quantity: itemExists.quantity + newItem.quantity };

        const newArray = prev.map((item) => (item._id === newItem._id ? updatedItem : item));

        return newArray;
      } else {
        return [...prev, newItem];
      }
    });
  };

  const removeCartItem = (cartItem) => {
    setCartItems((prev) => {
      return prev.filter((item) => item._id !== cartItem._id);
    });
  };

  // Calculate the total price based on the cart items
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.quantity * (item.price || 0), 0);
  };

  return (
    <cartContext.Provider
      value={{
        cartItems,
        toggleCart,
        isCartOpen,
        addToCart,
        removeCartItem,
        calculateTotalPrice,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export function useCartContext() {
  return useContext(cartContext);
}
