'use client'
import { useDispatch, useSelector } from 'react-redux';
import { reset } from '@/redux/cartSlice';

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleCheckout = () => {
    // You can add your checkout logic here
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
            <th className="py-2">Extras</th>
            <th className="py-2">Price</th>
            <th className="py-2">Quantity</th>
            <th className="py-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {cart.products.map((product) => (
            <tr key={product._id} className="border-b">
                    <td className="py-4">{product.title}</td>
              <td className="py-4">
                {product.extras?.map((extra) => (
                  <span key={extra._id}>{extra.text}, </span>
                ))}
              </td>
              <td className="py-4">${product.price}</td>
              <td className="py-4">{product.quantity}</td>
              <td className="py-4">${product.price * product.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
    {cart.products.length > 0 && (
      <div className="mt-6">
        <button
          onClick={handleCheckout}
          className="bg-blue-500 hover-bg-blue-600 text-white font-semibold py-2 px-4 rounded-full"
        >
          Checkout
        </button>
      </div>
    )}
  </div>
  );
};

export default Cart;
