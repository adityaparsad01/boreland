import React from 'react';
import { Link } from 'react-router-dom';
import { useOrders } from '../../context/OrderContext';
import { formatCurrency, formatDate, getStatusColor } from '../../lib/utils';
import { useAuth } from '../../context/AuthContext';

const OrdersPage = () => {
  const { orders, loading, error } = useOrders();
  const { currentUser } = useAuth();

  // Filter orders to only show the logged-in user's orders
  const userOrders = orders.filter(
    (order) => order.customer_email?.toLowerCase() === currentUser?.email?.toLowerCase() ||
               order.email?.toLowerCase() === currentUser?.email?.toLowerCase()
  );

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black mx-auto mb-4"></div>
        <p className="text-gray-500 text-lg">Loading your orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center text-red-500">
        <p className="text-xl font-semibold mb-2">Error loading orders</p>
        <p className="text-gray-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="border-b border-gray-200 pb-5 mb-8">
        <h1 className="text-3xl font-serif font-bold text-gray-900 tracking-tight">My Orders</h1>
        <p className="text-sm text-gray-500 mt-2">
          View your order history, shipping status, and receipts.
        </p>
      </div>

      {userOrders.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 border border-dashed border-gray-200 rounded-lg">
          <svg
            className="mx-auto h-12 w-12 text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          <h3 className="text-sm font-medium text-gray-900">No orders found</h3>
          <p className="mt-1 text-sm text-gray-500">You haven't placed any orders yet.</p>
          <div className="mt-6">
            <Link
              to="/products"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-semibold uppercase tracking-wider bg-black text-white hover:bg-gray-800 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {userOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
            >
              {/* Order Header */}
              <div className="bg-gray-50 px-4 py-4 sm:px-6 flex flex-wrap items-center justify-between gap-4 border-b border-gray-200">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Order Number
                    </p>
                    <p className="text-sm font-bold text-gray-900 mt-1">
                      {order.orderNumber || order.order_number || `ORD-${order.id.slice(0, 8).toUpperCase()}`}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Date Placed
                    </p>
                    <p className="text-sm text-gray-900 mt-1">
                      {formatDate(order.created_at || order.date)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Total Amount
                    </p>
                    <p className="text-sm font-bold text-gray-900 mt-1">
                      {formatCurrency(order.total_amount || order.total)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Payment Status
                    </p>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium uppercase tracking-wider mt-1 ${getStatusColor(
                        order.paymentStatus || order.payment_status || 'pending'
                      )}`}
                    >
                      {order.paymentStatus || order.payment_status || 'pending'}
                    </span>
                  </div>
                </div>

                <div>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${getStatusColor(
                      order.status || 'pending'
                    )}`}
                  >
                    {order.status || 'pending'}
                  </span>
                </div>
              </div>

              {/* Order Details (Standard display or Items list if present) */}
              <div className="px-4 py-5 sm:p-6">
                <div className="flex flex-col sm:flex-row justify-between gap-6">
                  <div className="space-y-2">
                    <h4 className="text-sm font-bold text-gray-900">Shipping Details</h4>
                    <p className="text-sm text-gray-600">
                      Method: {order.shipping_method || 'Standard Shipping'}
                    </p>
                    {order.tracking_number && (
                      <p className="text-sm text-gray-600">
                        Tracking Number:{' '}
                        <span className="font-mono bg-gray-100 px-1 py-0.5 rounded text-xs">
                          {order.tracking_number}
                        </span>
                      </p>
                    )}
                  </div>

                  <div className="flex items-center">
                    <Link
                      to="/contact"
                      className="text-sm font-semibold text-gray-600 hover:text-black transition-colors underline"
                    >
                      Need help with this order? Contact Support
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
