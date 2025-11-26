import { Star } from "lucide-react";
import React from "react";

export const getRatingStars = (rating = 0) => {
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
