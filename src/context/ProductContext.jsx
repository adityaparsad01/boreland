import React, { createContext, useContext, useState, useEffect } from 'react';
import apiService from '../api/apiService';

const ProductContext = createContext();

export const useProducts = () => {
  return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await apiService.getProducts();
        setProducts(data);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const addProduct = async (productData) => {
    const newProduct = await apiService.createProduct(productData);
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  const updateProduct = async (productId, updatedData) => {
    const updatedProduct = await apiService.updateProduct(productId, updatedData);
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? updatedProduct : product
      )
    );
  };

  const deleteProduct = async (productId) => {
    await apiService.deleteProduct(productId);
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
  };

  const getProductById = (productId) => {
    return products.find(p => p.id === productId);
  };

  const value = {
    products,
    loading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};
