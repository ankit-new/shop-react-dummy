import React, { useState, useEffect } from 'react';
import { limitProduct } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../features/cartSlice';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

const TopProducts = () => {
  const navigate = useNavigate();
  const [randomProducts, setRandomProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await limitProduct();
    setRandomProducts(response.data.products);
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success(`${product.title} added to cart!`);
  
  };
  

  return (
    <div className="container mx-auto py-8">
      <ToastContainer />
      <h1 className="text-3xl font-bold text-center mb-6">Top Selling Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {randomProducts.map((product) => (
          <div key={product.id} className="border border-gray-200 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
            <img
              src={product.images[0]}
              alt={product.title}
              className="h-48 w-full object-cover mb-4 rounded"
            />
            <h2 className="text-lg font-semibold text-gray-800">{product.title}</h2>
            <p className="text-blue-600 font-bold mt-2">${product.price}</p>
            <p className="text-sm text-gray-600 mt-1">Category: {product.category}</p>
            <p className="text-sm text-gray-500 mt-2">
              {product.description.length > 100
                ? `${product.description.substring(0, 100)}...`
                : product.description}
            </p>

            <div className="mt-2">
              <span className="text-yellow-500">&#9733;</span>
              <span>{product.rating} ({5} reviews)</span>
            </div>

            <div className="mt-4 flex justify-between">
              <Link
                to={`/edit-product/${product.id}`}
                className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
              >
                Edit
              </Link>
              <button
                onClick={() => handleAddToCart(product)}
                className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-12">
        <button
          onClick={() => navigate('/products')}
          className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600"
        >
          See More Products
        </button>
      </div>
    </div>
  );
};

export default TopProducts;
