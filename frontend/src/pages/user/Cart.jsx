import React, { useState } from "react";
import useCartStore from "@/store/cartstore";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  Zap,
  Truck,
  Shield,
  CheckCircle,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/ui/custom/Button";
import Title from "@/components/ui/custom/Title";
import usePageTitle from "@/hooks/usePageTitle";

const Cart = () => {
  const { cartItems, removeItem, clearCart } = useCartStore();
  const navigate = useNavigate();
  const [itemQuantities, setItemQuantities] = useState({});
  usePageTitle({ title: `Cart (${cartItems?.length})` });

  const handleQuantityChange = (itemId, quantity) => {
    if (quantity < 1) return;
    setItemQuantities((prev) => ({
      ...prev,
      [itemId]: quantity,
    }));
  };

  const getQuantity = (itemId) => itemQuantities[itemId] || 1;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * getQuantity(item.id),
    0
  );

  const shippingCost = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.1;
  const total = subtotal + shippingCost + tax;

  const handleContinueShopping = () => {
    navigate("/products");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <button
            onClick={() => navigate(-1)}
            className="flex text-sm items-center gap-2 text-slate-600 hover:text-slate-700 font-semibold mb-6 transition-colors duration-300 cursor-pointer"
          >
            <ArrowLeft size={20} />
            Continue Shopping
          </button>

          <div className="flex items-center justify-center">
            <div>
              <Title title={"Shopping Cart"} />
            </div>
          </div>
        </div>

        {cartItems.length === 0 ? (
          // Empty Cart State
          <div className="text-center py-16 animate-fade-in">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-yellow-400 opacity-20 blur-xl rounded-full"></div>
                <ShoppingCart
                  size={80}
                  className="text-gray-300 relative z-10"
                />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any items yet. Let's change that!
            </p>
            <Button
              onClick={handleContinueShopping}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-lg font-semibold inline-flex items-center gap-2 transition-all duration-300 hover:shadow-lg"
            >
              Start Shopping
            </Button>
          </div>
        ) : (
          // Cart Contents
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                {/* Cart Items List */}
                <div className="divide-y divide-gray-200">
                  {cartItems.map((item, index) => (
                    <div
                      key={item.id}
                      className="p-3.5 hover:bg-gray-50 transition-colors duration-300 animate-slide-in"
                      style={{
                        animationDelay: `${index * 0.1}s`,
                      }}
                    >
                      <div className="relative flex flex-col items-center md:flex-row gap-6">
                        {/* Product Image */}
                        <div className="flex-shrink-0">
                          <div className="w-28 h-28 rounded-lg bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-300">
                            {item.thumbnail ? (
                              <img
                                src={item.thumbnail}
                                alt={item.title}
                                className="w-full h-full object-cover rounded-lg"
                              />
                            ) : (
                              <ShoppingCart
                                className="text-gray-400"
                                size={40}
                              />
                            )}
                          </div>
                        </div>

                        {/* Product Details */}
                        <div className="flex-grow">
                          <h3 className="text-sm font-bold text-gray-900 mb-1">
                            {item.title || "Product"}
                          </h3>
                          <p className="text-gray-600 text-xs mb-3">
                            {item.vendor || "Vendor"}
                          </p>

                          {/* Price and Details */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <p className="text-sm font-bold text-slate-600">
                                ${item.price || 0}
                              </p>
                              {item.originalPrice && (
                                <p className="text-gray-400 line-through text-sm">
                                  ${item.originalPrice}
                                </p>
                              )}
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-2">
                              <button
                                onClick={() =>
                                  handleQuantityChange(
                                    item.id,
                                    getQuantity(item.id) - 1
                                  )
                                }
                                className="p-1 hover:bg-gray-200 rounded transition-colors duration-200"
                              >
                                <Minus size={15} className="text-gray-600" />
                              </button>
                              <input
                                type="number"
                                value={getQuantity(item.id)}
                                onChange={(e) =>
                                  handleQuantityChange(
                                    item.id,
                                    parseInt(e.target.value) || 1
                                  )
                                }
                                className="w-12 text-center text-sm bg-white border border-gray-300 rounded font-semibold text-gray-900"
                                min="1"
                              />
                              <button
                                onClick={() =>
                                  handleQuantityChange(
                                    item.id,
                                    getQuantity(item.id) + 1
                                  )
                                }
                                className="p-1 hover:bg-gray-200 rounded transition-colors duration-200"
                              >
                                <Plus size={15} className="text-gray-600" />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Remove Button */}
                        <div className="absolute top-2 right-2 md:left-2 flex-shrink-0">
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-2 bg-white text-red-500 hover:text-red-700 hover:bg-red-50 rounded-sm cursor-pointer transition-all duration-300"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Cart Actions */}
                <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-between gap-3">
                  <button
                    onClick={clearCart}
                    className=" px-5 py-0 text-sm border  border-red-500 text-red-500 font-semibold rounded-sm cursor-pointer hover:bg-red-50 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Trash2 size={18} />
                    Clear Cart
                  </button>

                  <div className="text-right">
                    <p className="text-gray-600 text-sm font-semibold">
                      Total Items
                    </p>
                    <p className="text-lg bg-white border border-gray-300 px-2 rounded font-bold text-gray-700">
                      {cartItems.length}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-xl p-8 text-white sticky top-4 animate-slide-in-right">
                <h2 className="text-2xl font-bold mb-8">Order Summary</h2>

                {/* Summary Items */}
                <div className="space-y-4 mb-8 pb-8 border-b border-blue-400">
                  <div className="flex justify-between items-center">
                    <span className="text-blue-100">Subtotal</span>
                    <span className="font-semibold">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-blue-100">Shipping</span>
                    <span className="font-semibold">
                      {shippingCost === 0 ? (
                        <span className="text-green-300 flex items-center gap-1">
                          <CheckCircle size={16} />
                          Free
                        </span>
                      ) : (
                        `$${shippingCost.toFixed(2)}`
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-blue-100">Tax (10%)</span>
                    <span className="font-semibold">${tax.toFixed(2)}</span>
                  </div>
                </div>

                {/* Total */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xl font-bold">Total</span>
                    <span className="text-3xl font-bold">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Checkout Button */}
                <Button variant="secondary" className="w-full py-4">
                  <ShoppingCart
                    size={20}
                    className="group-hover:animate-bounce"
                  />
                  Proceed to Checkout
                </Button>

                {/* Additional Info */}
                <div className="mt-8 pt-8 border-t border-blue-400 space-y-3">
                  <p className="text-sm text-blue-100 flex items-center gap-2">
                    <CheckCircle size={16} />
                    Secure payments
                  </p>
                  <p className="text-sm text-blue-100 flex items-center gap-2">
                    <Truck size={16} />
                    Track your order
                  </p>
                  <p className="text-sm text-blue-100 flex items-center gap-2">
                    <Shield size={16} />
                    Buyer protection
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add CSS animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }

        .animate-slide-in {
          animation: slideIn 0.5s ease-out forwards;
          opacity: 0;
        }

        .animate-slide-in-right {
          animation: slideInRight 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Cart;
