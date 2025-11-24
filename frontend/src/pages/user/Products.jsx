import { FaSearch } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import CusSelect from "@/components/ui/custom/Select";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "@/lib/axios";
import ProductCard from "@/components/ui/ProductCard";
import Input from "@/components/input/Input";
import usePageTitle from "@/hooks/usePageTitle";

const Products = () => {
  usePageTitle({ title: "Products" });
  const [query, setQuery] = useState("");
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const InputRef = useRef();

  const { data: products } = useQuery({
    queryKey: ["all-products"],
    queryFn: async () => {
      try {
        const response = await axios.get("/products?limit=50&offset=0");
        return response.data;
      } catch (error) {
        // toast.error("Failed to fetch products");
        console.log("Error fetching products:", error);
      }
    },
  });

  const { data: results, mutateAsync: fetchResults } = useMutation({
    mutationFn: async () => {
      try {
        const response = await axios.get(`/products/?title=${query}`);
        return response.data;
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
    if (query.length > 0) {
      fetchResults().then((data) => {
        queryClient.setQueryData(["search-results", query], data);
      });
    }
    console.log(products);
  }, [query]);
  return (
    <div className="px-4 md:px-8 lg:px-16 mt-5">
      <div className="flex items-center gap-2">
        <button
          className=" rounded-md text-gray-500 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        <div className="relative flex-1">
          <Input
            type="text"
            ref={InputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for items..."
            className="w-full "
          />

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
              { value: "all", label: "All" },
              { value: "electronics", label: "Electronics" },
              { value: "fashion", label: "Fashion" },
              { value: "books", label: "Books" },
              { value: "groceries", label: "Groceries" },
            ]}
          />
        </div>

        <div>
          {/* Sort By */}
          <CusSelect
            selectValue={"Sort By"}
            optionsLabel={"Sort Options"}
            options={[
              { value: "relevance", label: "Relevance" },
              { value: "price_low_high", label: "Price: Low to High" },
              { value: "price_high_low", label: "Price: High to Low" },
              { value: "newest_first", label: "Newest First" },
            ]}
          />
        </div>
      </div>

      <section>
        {!query && (
          <div className="mt-6 grid  grid-cols-2 md:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-8 gap-6">
            {products?.map((item) => (
              <ProductCard
                key={item.id}
                id={item.id}
                title={item.title}
                price={item.price}
                image={item.images[0]}
                rating={item.rating}
                description={item.description}
              />
            ))}
          </div>
        )}
        {query.length > 0 && (
          <div className="mt-6 grid  grid-cols-2 md:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-8 gap-6">
            {results?.map((item) => (
              <ProductCard
                key={item.id}
                id={item.id}
                title={item.title}
                price={item.price}
                image={item.images[0]}
                rating={item.rating}
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
