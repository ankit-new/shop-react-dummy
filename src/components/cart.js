import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} from "../features/cartSlice";

const Cart = () => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-700">Your cart is empty.</p>
      ) : (
        <div className="max-w-lg mx-auto">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-4 p-4 border rounded-md shadow-md bg-white"
            >

              <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md"
                />
                <div>
                  <p className="font-bold text-sm sm:text-base">{item.title}</p>
                  <p className="text-sm text-gray-500">${item.price}</p>
                </div>
              </div>

              <div className="flex items-center mb-4 sm:mb-0 space-x-1">
                <button
                  onClick={() => dispatch(decrementQuantity(item))}
                  className="bg-gray-300 text-gray-700 py-1 px-3 rounded-l-md focus:outline-none"
                >
                  -
                </button>
                <span className="px-3 sm:px-4">{item.quantity}</span>
                <button
                  onClick={() => dispatch(incrementQuantity(item))}
                  className="bg-gray-300 text-gray-700 py-1 px-3 rounded-r-md focus:outline-none"
                >
                  +
                </button>
              </div>

             
              <div>
                <button
                  onClick={() => dispatch(removeFromCart(item))}
                  className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition duration-300"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

        
          <div className="text-center font-bold text-lg sm:text-xl mt-8">
            Total: ${getTotalPrice().toFixed(2)}
          </div>

          <div className="flex justify-center mt-4">
            <button
              onClick={() => dispatch(clearCart())}
              className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300 focus:outline-none"
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
