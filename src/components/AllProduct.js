import React, { useState, useEffect } from "react";
import { getProducts } from "../services/api";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await getProducts();
    setProducts(response.data.products);
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success(`${product.title} added to cart!`);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <ToastContainer />

      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">All Products</h1>

      {/* Search Input */}
      <div className="flex justify-center sm:justify-end mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-auto border border-gray-300 rounded-lg py-2 px-4 sm:py-3 sm:px-5 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="border border-gray-200 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={product.images[0]}
              alt={product.title}
              className="h-48 w-full object-cover mb-4 rounded"
            />
            <h2 className="text-lg font-semibold text-gray-800">
              {product.title}
            </h2>
            <p className="text-blue-600 font-bold mt-2">${product.price}</p>
            <p className="text-sm text-gray-600 mt-1">
              Category: {product.category}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              {product.description.length > 100
                ? `${product.description.substring(0, 100)}...`
                : product.description}
            </p>

            <div className="mt-2">
              <span className="text-yellow-500">&#9733;</span>
              <span>
                {product.rating} ({5} reviews)
              </span>
            </div>

            <div className="mt-4 flex justify-between">
              <Link
                to={`/edit-product/${product.id}`}
                className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition duration-300"
              >
                Edit
              </Link>
              <button
                onClick={() => handleAddToCart(product)}
                className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 transition duration-300"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
