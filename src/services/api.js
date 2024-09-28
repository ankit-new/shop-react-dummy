import axios from 'axios';


const api = axios.create({
  baseURL: 'https://dummyjson.com/', 
});

export const getProducts = () => api.get('/products');

export const getProductById = (id) => api.get(`/products/${id}`);

export const addProduct = (product) => api.post('/products', product);

export const updateProduct = (id, updatedProduct) => api.put(`/products/${id}`, updatedProduct);

export const deleteProduct = (id) => api.delete(`/products/${id}`);

export const limitProduct = () => api.get('products', { params: { limit: 12 } });

