import { FaSearch } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import CusSelect from "@/components/ui/custom/Select";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "@/lib/axios";

const Search = () => {
  const [query, setQuery] = useState("");
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const InputRef = useRef();

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
    if (query.length > 2) {
      fetchResults().then((data) => {
        queryClient.setQueryData(["search-results", query], data);
      });
    }
  }, [query]);

  return (
    <div className="fixed top-0 left-0 z-60  bg-gray-50 w-full min-h-screen p-6">
      <div className="flex items-center gap-2">
        <button
          className=" rounded-md text-gray-500 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        <div className="relative flex-1">
          <input
            type="text"
            ref={InputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for items..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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

      <div className="mt-6">
        {/* Search Results */}
        <div className="min-h-[400px] ">
          {results?.map((item) => (
            <div key={item.id}>
              <h2>{item.title}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
