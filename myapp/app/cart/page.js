'use client'
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reset } from '@/redux/cartSlice';

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleCheckout = () => {
    // You can add your checkout logic here
  };

  const calculateTotal = () => {
    return cart.products.reduce((total, product) => {
      return total + product.total;
    }, 0);
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-semibold mb-4">Your Cart</h1>
      {cart.products.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="py-2">Name</th>
              <th className="py-2">Description</th>
              <th className="py-2">Price</th>
              <th className="py-2">Preparation</th>
              <th className="py-2">Sides</th>
              <th className="py-2">Drinks</th>
              <th className="py-2">Extra Options</th>
              <th className="py-2">Special Instructions</th>
              <th className="py-2">Quantity</th>
              <th className="py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {cart.products.map((product) => (
              <tr key={product.id} className="border-b">
                <td className="py-4">{product.title}</td>
                <td className="py-4">{product.desc}</td>
                <td className="py-4">${product.total}</td>
                <td className="py-4">{product.selectedPrep}</td>
                <td className="py-4">
                  {product.selectedSides.join(', ')}
                </td>
                <td className="py-4">
                  {product.selectedDrinks.join(', ')}
                </td>
                <td className="py-4">
                  {product.selectedExtraOptions.join(', ')}
                </td>
                <td className="py-4">{product.instructions}</td>
                <td className="py-4">{product.quantity}</td>
                <td className="py-4">${product.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {cart.products.length > 0 && (
        <div className="mt-6">
          <p className="text-2xl font-semibold mt-4">
            Total: ${calculateTotal()}
          </p>
          <button
            onClick={handleCheckout}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
