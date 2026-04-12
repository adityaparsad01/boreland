import React, { createContext, useContext, useState, useEffect } from 'react';
import apiService from '../api/apiService';

const OrderContext = createContext();

export const useOrders = () => {
  return useContext(OrderContext);
};

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await apiService.getOrders();
        setOrders(data);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const updatedOrder = await apiService.updateOrderStatus(orderId, newStatus);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? updatedOrder : order
        )
      );
    } catch (err) {
      console.error("Failed to update order status:", err);
      // In a real app, you might set an error state here
    }
  };

  const value = {
    orders,
    loading,
    error,
    updateOrderStatus,
  };

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};
