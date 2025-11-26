import { clsx } from "clsx";
import { Star } from "lucide-react";
import React from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const shortenText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

export const formatPrice = (price) => {
  return `GH₵${price?.toFixed(2) || "0.00"}`;
};
