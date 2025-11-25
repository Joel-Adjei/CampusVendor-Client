import { FaSearch } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import CusSelect from "@/components/ui/custom/Select";
import { ArrowLeft, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "@/lib/axios";
import ProductCard from "@/components/ui/ProductCard";
import Input from "@/components/input/Input";
import usePageTitle from "@/hooks/usePageTitle";
import LoadingSpinner from "@/components/ui/custom/LoadingSpinner";

const Products = () => {
  usePageTitle({ title: "Products" });
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const InputRef = useRef();

  const { data: products } = useQuery({
    queryKey: ["all-products"],
    queryFn: async () => {
      try {
        const response = await axios.get("/products?limit=48");
        return response.data.products;
      } catch (error) {
        // toast.error("Failed to fetch products");
        console.log("Error fetching products:", error);
      }
    },
  });

  const { data: categories } = useQuery({
    queryKey: ["list-categories"],
    queryFn: async () => {
      try {
        const response = await axios.get("/products/category-list");
        return response.data;
      } catch (error) {
        // toast.error("Failed to fetch categories");
        console.log("Error fetching categories:", error);
      }
    },
  });

  const {
    data: results,
    mutateAsync: fetchResults,
    isPending: loading,
  } = useMutation({
    mutationFn: async () => {
      if (selectedCategory !== "all") {
        try {
          const response = await axios.get(
            `/products/category/${selectedCategory}`
          );
          return response.data.products;
        } catch (error) {
          // toast.error("Failed to fetch products");
          console.log("Error fetching products:", error);
        }
      }
      try {
        const response = await axios.get(`/products/search?q=${query}`);
        return response.data.products;
      } catch (error) {
        console.log("Error fetching search results:", error);
      }
    },
    // queryKey: ["search-results", query],
    // enabled: false, // Disable automatic query on mount
  });

  useEffect(() => {
    InputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (query.length > 0 || selectedCategory !== "all") {
      fetchResults();
    }
    console.log(products);
  }, [query, selectedCategory]);

  return (
    <div className="px-4 md:px-8 lg:px-16 mt-5">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Input
            type="text"
            ref={InputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for items..."
            className="w-full "
          />
          {query.length > 0 && (
            <button
              className="absolute right-13 top-3.5 rounded-md text-gray-500 cursor-pointer"
              onClick={() => setQuery("")}
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <FaSearch className="absolute right-4 top-3 w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* Filters */}
      <div className="mt-6 flex gap-4">
        <div>
          <CusSelect
            selectValue={"Select Category"}
            optionsLabel={"Categories"}
            options={[
              { label: "All Categories", value: "all" },
              ...categories?.map((category) => ({
                label: category,
                value: category,
              })),
            ]}
            value={selectedCategory}
            onChange={(option) => {
              setSelectedCategory(option.value);
            }}
          />
        </div>
      </div>

      <section>
        {loading && <LoadingSpinner />}

        {!query.length && selectedCategory === "all" && (
          <div className="mt-6 grid  grid-cols-2 md:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-8 gap-6">
            {products?.map((item) => (
              <ProductCard
                key={item.id}
                id={item.id}
                title={item.title}
                price={item.price}
                image={item.images[0]}
                rating={item.rating}
                reviewsCount={item.reviews.length}
                description={item.description}
              />
            ))}
          </div>
        )}
        {(query.length > 0 || selectedCategory !== "all") && (
          <div className="mt-6 grid  grid-cols-2 md:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-8 gap-6">
            {results?.map((item) => (
              <ProductCard
                key={item.id}
                id={item.id}
                title={item.title}
                price={item.price}
                image={item.images[0]}
                rating={item.rating}
                reviewsCount={item.reviews.length}
                description={item.description}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Products;
