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

const ProductCard = ({
//   id,
  product = {},
  price,
  image,
  title,
  onAddToCart,
  onViewDetails,
  onToggleFavorite,
  className = "",
  variant = "default",
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(product.isFavorite || false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    if (onToggleFavorite) {
      onToggleFavorite(product.id, !isFavorite);
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(product);
    }
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

  const getRatingStars = (rating = 0) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : "text-gray-300"
        }`}
      />
    ));
  };

  const formatPrice = (price) => {
    return `GH₵${price?.toFixed(2) || "0.00"}`;
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
      <button
        onClick={handleFavoriteClick}
        className={`
          absolute top-3 right-3 z-20 p-2 rounded-full
          transition-all duration-300 transform hover:scale-110
          ${
            isFavorite
              ? "bg-red-100 text-red-500"
              : "bg-white/80 text-gray-400 hover:text-red-500"
          }
          ${isHovered ? "opacity-100" : "opacity-0"}
        `}
      >
        <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
      </button>

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
          absolute inset-0 bg-black/40 
          flex items-center justify-center gap-3
          transition-all duration-300
          ${isHovered ? "opacity-100" : "opacity-0"}
        `}
        >
          <button
            onClick={handleViewDetails}
            className="p-3 bg-white/90 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-110"
          >
            <Eye className="w-5 h-5" />
          </button>

          <button
            onClick={handleAddToCart}
            className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:scale-110"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-5 space-y-1">
        {/* Title and Category */}
        <div>
          <h3 className="font-medium text-gray-700 text-sm mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
            {title || "Product Name"}
          </h3>
          {/* <p className="text-xs md:text-sm text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded-sm w-fit">
            {category || "Category"}
          </p> */}
        </div>

        {/* Rating and Reviews */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">{getRatingStars(4.5)}</div>
            <span className="text-sm text-gray-500">
              ({7})
            </span>
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
