import Modal from "@/components/ui/Modal";
import { FaSearch } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import CusSelect from "@/components/ui/custom/Select";

const Items = [
    { id: 1, name: "Wireless Headphones", category: "Electronics", price: "$59.99" },
    { id: 2, name: "Running Shoes", category: "Fashion", price: "$89.99" },
    { id: 3, name: "Smartphone", category: "Electronics", price: "$699.99" },
    { id: 4, name: "Cookbook", category: "Books", price: "$24.99" },
    { id: 5, name: "Organic Coffee Beans", category: "Groceries", price: "$14.99" },
    { id: 6, name: "Yoga Mat", category: "Fitness", price: "$29.99" },
    { id: 7, name: "Bluetooth Speaker", category: "Electronics", price: "$49.99" },
    { id: 8, name: "Denim Jacket", category: "Fashion", price: "$79.99" },
    { id: 9, name: "Mystery Novel", category: "Books", price: "$19.99" },
    { id: 10, name: "Trail Mix", category: "Groceries", price: "$9.99" },
    { id: 11, name: "Fitness Tracker", category: "Fitness", price: "$129.99" },
    { id: 12, name: "4K Action Camera", category: "Electronics", price: "$199.99" },
    
];

const Search = () => {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const InputRef = useRef();

  const handleSearch = () => {
    let filteredItems = Items.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );

    const selectedCategory = "all"; // Example: this could come from a state variable
    if (selectedCategory !== "all") {
        filteredItems = filteredItems.filter(item => item.category.toLowerCase() === selectedCategory);
    }

    setResults(filteredItems);
  }

  useEffect(() => {
    handleSearch();
  }, [query]);

  return (
    <Modal display={true}>
      <div className="p-4">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for items..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <FaSearch className="absolute right-4 top-3 w-5 h-5 text-gray-400" />
        </div>


        {/* Filters */}
        <div className="mt-6 flex gap-4">
            <div>
                <CusSelect
                    selectValue={"Select Category"}
                    optionsLabel={"Categories"}
                    options={[
                        {value: "all", label: "All"},
                        {value: "electronics", label: "Electronics"},
                        {value: "fashion", label: "Fashion"},
                        {value: "books", label: "Books"},
                        {value: "groceries", label: "Groceries"},
                    ]}
                />
            </div>

            <div>
              
            {/* Sort By */}
            <CusSelect
                selectValue={"Sort By"}
                optionsLabel={"Sort Options"}
                options={[
                    {value: "relevance", label: "Relevance"},
                    {value: "price_low_high", label: "Price: Low to High"},
                    {value: "price_high_low", label: "Price: High to Low"},
                    {value: "newest_first", label: "Newest First"},
                ]}

            />
            </div>
        </div>

        <div className="mt-6">
            {/* Search Results */}
            <div className="min-h-[400px] "> 
                {
                    results.map((item)=>(
                        <div key={item.id}>
                            <h2>{item.name}</h2>
                        </div>
                    ))
                }
            </div>
        </div>
      </div>
    </Modal>
  );
};

export default Search;
