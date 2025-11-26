import React, { useState } from "react";
import {
  Star,
  ShoppingCart,
  Heart,
  Eye,
  MapPin,
  Clock,
  Badge,
  Package,
  User,
  DollarSign,
} from "lucide-react";
import Button from "./custom/Button";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "@/lib/utils";
import { getRatingStars } from "@/lib/minComp";

const ProductCard = ({
  //   id,
  product = {},
  price,
  image,
  title,
  onAddToCart,
  onViewDetails,
  onToggleFavorite,
  rating,
  type = "new",
  reviewsCount,
  className = "",
  variant = "default",
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/products/${product.id}`);
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "featured":
        return "bg-gradient-to-br from-blue-50 via-yellow-50 to-orange-50 border-2 border-blue-200";
      case "sale":
        return "bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 border-2 border-red-200";
      default:
        return "bg-white border border-gray-200";
    }
  };

  const {
    label,
    styles,
    icon: Icon,
  } = () => {
    switch (type) {
      case "new":
        return {
          label: "New",
          styles: "bg-green-100 text-green-800",
          icon: <Badge className="w-3 h-3 mr-1" />,
        };
      case "out":
        return {
          label: "Out of Stock",
          styles: "bg-red-100 text-red-800",
          icon: <Clock className="w-3 h-3 mr-1" />,
        };
      case "service":
        return {
          label: "Service",
          styles: "bg-blue-100 text-blue-800",
          icon: <User className="w-3 h-3 mr-1" />,
        };
      default:
        return null;
    }
  };

  return (
    <div
      className={`
        ${getVariantStyles()}
        font-Montserrat h-full
        rounded-2xl shadow-lg hover:shadow-xl 
        transition-all duration-500 ease-out 
        transform hover:-translate-y-2 hover:scale-[1.02]
        cursor-pointer group relative overflow-hidden
        ${className}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleViewDetails}
    >
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-300 rounded-full opacity-5 -translate-y-12 translate-x-12 transition-transform duration-500 group-hover:scale-150"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-blue-500 rounded-full opacity-5 translate-y-8 -translate-x-8 transition-transform duration-500 group-hover:scale-150"></div>

      {/* Favorite Button */}
      <div
        className={` } from "@/lib
          absolute top-1.5 right-1.5 z-20 p-2 rounded-full
          transition-all duration-300 transform hover:scale-110
        `}
      >
        <p
          className={`flex items-center text-xs md:text-xs font-medium ${styles} px-2 py-1 rounded-xs w-fit`}
        >
          {Icon}
          {label}
        </p>
      </div>

      {/* Product Image */}
      <div className="relative h-40 rounded-t-2xl overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-yellow-100 animate-pulse flex items-center justify-center">
            <Package className="w-12 h-12 text-blue-300" />
          </div>
        )}

        <img
          src={image || "/api/placeholder/300/200"}
          alt={title}
          className={`
            w-full h-full object-cover transition-all duration-700
            ${isHovered ? "scale-110" : "scale-100"}
            ${imageLoaded ? "opacity-100" : "opacity-0"}
          `}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />

        {/* Overlay Actions */}
        <div
          className={`
          absolute inset-0 bg-black/10 
          flex items-center justify-center gap-3
          transition-all duration-300
          ${isHovered ? "opacity-100" : "opacity-0"}
        `}
        ></div>
      </div>

      {/* Product Info */}
      <div className="p-5 space-y-1">
        {/* Title and Category */}
        <div>
          <h3 className="font-medium text-gray-700 text-sm mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
            {title || "Product Name"}
          </h3>
        </div>

        {/* Rating and Reviews */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">{getRatingStars(rating || 4)}</div>
            <span className="text-sm text-gray-500">({reviewsCount || 7})</span>
          </div>

          {product.type && (
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
              new
            </span>
          )}
        </div>

        {/* Price and Stock */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-slate-600">
                {formatPrice(price)}
              </span>
              {/* {product.originalPrice &&
                product.originalPrice > product.price && (
                  <span className="text-sm text-gray-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )} */}
            </div>
          </div>
        </div>
      </div>

      {/* Hover Animation Border */}
      <div
        className={`
        absolute inset-0 rounded-2xl border-2 border-blue-400 
        transition-opacity duration-300
        ${isHovered ? "opacity-100" : "opacity-0"}
      `}
      />
    </div>
  );
};

export default ProductCard;
