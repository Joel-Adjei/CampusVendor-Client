import React, { useState, useEffect } from "react";
import {
  Package2,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  ShoppingCart,
  DollarSign,
  Star,
  TrendingUp,
  AlertCircle,
  ImageIcon,
  Tag,
} from "lucide-react";
import Button from "@/components/ui/custom/Button";
import CusSelect from "@/components/ui/custom/Select";
import Modal from "@/components/ui/Modal";
import LoadingSpinner from "@/components/ui/custom/LoadingSpinner";
import Input from "@/components/input/Input";
import AddProduct from "./AddProduct";
import { images } from "@/assets/assets";
import useVendorProductStore from "@/store/useVendorProductStore";

const VendorProduct = () => {
  const setEditProduct = useVendorProductStore(state => state.setEditProduct)
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    image: "",
  });

  // Mock data with campus-related products
  const mockProducts = [
    {
      id: "PRD-001",
      name: "Campus T-Shirt",
      description:
        "Official university branded t-shirt made from premium cotton",
      price: 25.0,
      category: "Clothing",
      rating: 4.5,
      image: images.item1,
      availabilty: true,
    },
    {
      id: "PRD-002",
      name: "Study Guide - Mathematics",
      description: "Comprehensive study guide for advanced mathematics courses",
      price: 35.0,
      category: "Books",
      rating: 4.5,
      image: images.item1,
      availabilty: false,
    },
    {
      id: "PRD-003",
      name: "Campus Hoodie",
      description: "Warm and comfortable hoodie perfect for campus life",
      price: 45.0,
      category: "Clothing",
      rating: 4.3,
      image: images.item1,
      availabilty: true,
    },
    {
      id: "PRD-004",
      name: "Laptop Stand",
      description: "Ergonomic laptop stand for better study posture",
      price: 28.0,
      category: "Accessories",
      rating: 4.6,
      image: images.item1,
      availabilty: true,
    },
    {
      id: "PRD-005",
      name: "Water Bottle",
      description: "Insulated water bottle with university logo",
      price: 15.0,
      category: "Accessories",
      rating: 4.2,
      image: images.item1,
      availabilty: true,
    },
  ];

  const categoryOptions = [
    { value: "all", label: "All Categories" },
    { value: "Clothing", label: "Clothing" },
    { value: "Books", label: "Books" },
    { value: "Accessories", label: "Accessories" },
    { value: "Electronics", label: "Electronics" },
  ];

  useEffect(() => {
    setTimeout(() => {
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
      setIsLoading(false);
    }, 1500);
  }, []);

  useEffect(() => {
    let filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (categoryFilter !== "all") {
      filtered = filtered.filter(
        (product) => product.category === categoryFilter
      );
    }

    setFilteredProducts(filtered);
  }, [searchTerm, categoryFilter, products]);

  const getStatusColor = (status) => {
    if (status === false) {
      return "bg-gradient-to-r from-red-500 to-red-600 text-white";
    }
    return "bg-gradient-to-r from-green-500 to-green-600 text-white";
  };

  const getStatusText = (status) => {
    if (status) return "In Stock";
    return "Out of Stock";
  };

  const handleAddProduct = (values) => {
    const productId = `PRD-${String(products.length + 1).padStart(3, "0")}`;
    const product = {
      ...values,
      id: productId,
      price: parseFloat(values.price),
      stock: parseInt(newProduct.stock),
      sold: 0,
      rating: 0,
      status: "active",
    };

    setProducts([...products, product]);
    setNewProduct({
      name: "",
      description: "",
      price: "",
      category: "",
      stock: "",
      image: "",
    });
    setShowAddModal(false);
  };

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter((p) => p.id !== productId));
    setSelectedProduct(null);
  };

  const stats = {
    total: products.length,
    active: products.filter((p) => p.status === "active" && p.stock > 0).length,
    lowStock: products.filter((p) => p.stock > 0 && p.stock <= 10).length,
    outOfStock: products.filter((p) => p.stock === 0).length,
    totalRevenue: products.reduce((sum, p) => sum + p.sold * p.price, 0),
    totalSold: products.reduce((sum, p) => sum + p.sold, 0),
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-yellow-50 flex items-center justify-center">
        <LoadingSpinner message="Loading your products..." themeColor="blue" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-yellow-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header with color palette integration */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-400 rounded-2xl p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400 rounded-full opacity-10 -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full opacity-20 translate-y-24 -translate-x-24"></div>

          <div className="relative z-10 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/20 rounded-md backdrop-blur-sm">
                <Package2 className="w-8 h-8 text-brand" />
              </div>
              <div>
                <h1 className="text-3xl font-bold font-Montserrat">
                  Product Management
                </h1>
                <p className="text-blue-100 mt-1">
                  Manage your inventory and product catalog
                </p>
              </div>
            </div>
            <Button
              onClick={() => setShowAddModal(true)}
              variant="secondary"
              iconType="icon-left"
              Icon={Plus}
              iconSize={20}
              className=" !bg-white !text-blue-700 hover:!bg-blue-50 transition-all duration-300 transform hover:scale-105"
            >
              Add Product
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">
                  Total Products
                </p>
                <p className="text-2xl font-bold text-blue-900 mt-1">
                  {stats.total}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Package2 className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">
                  Active Products
                </p>
                <p className="text-2xl font-bold text-green-600 mt-1">
                  {stats.active}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <ShoppingCart className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-amber-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Low Stock</p>
                <p className="text-2xl font-bold text-amber-300 mt-1">
                  {stats.lowStock}
                </p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <AlertCircle className="w-6 h-6 text-amber-300" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="p-3">
          <div className="flex md:items-center flex-col md:flex-row gap-4">
            <div className="md:flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search products by name, description, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 bg-white mt-0"
              />
            </div>

            <div className="relative  min-w-[200px]">
              {/* <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-10" /> */}
              <div className=" ">
                <CusSelect
                  Icon={Filter}
                  selectValue="All Categories"
                  value={categoryFilter}
                  optionsLabel="Product Categories"
                  onChange={(selected) => setCategoryFilter(selected.value)}
                  options={categoryOptions}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
              style={{
                animation: `slideIn 0.5s ease-out ${index * 100}ms forwards`,
                opacity: 0,
              }}
            >
              <div className="relative">
                <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-yellow-100 flex items-center justify-center">
                  <img 
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <div
                  className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    product.availabilty,
                  )}`}
                >
                  {getStatusText(product.availabilty)}
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 text-sm">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-xs text-gray-500">
                      {product.rating}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 text-xs mb-3 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-blue-500" />
                    <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                      {product.category}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-lg font-bold text-green-600">
                      ${product.price}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-blue-600 font-medium">
                      {product.id}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => setSelectedProduct(product)}
                    variant="secondary"
                    iconType="icon-left"
                    Icon={Eye}
                    iconSize={14}
                    className="!px-3 !py-1 !text-xs flex-1"
                  >
                    View
                  </Button>
                  <Button
                    onClick={() => {
                      setEditProduct(product)
                      setShowAddModal(true)
                    }}
                    variant="outline"
                    iconType="icon-only"
                    Icon={Edit}
                    iconSize={14}
                    className="!px-2 !py-1 !w-8 !h-8"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Product Modal */}
        {showAddModal && (
          <Modal
            display={true}
            title={"Add New Product"}
            subTitle={"Create a new product for your catalog"}
            Icon={Package2}
            onClose={() => {
              setShowAddModal(false)
              setEditProduct(null)
            }}
          >
            <AddProduct
              handleAddProduct={handleAddProduct}
              onCancel={() => {
                setShowAddModal(false)
                setEditProduct(null)
              }}

            />
          </Modal>
        )}

        {/* Product Detail Modal */}
        {selectedProduct && (
          <Modal 
            display={true}
            title={"Product Details"}
            subTitle={selectedProduct.id}
            Icon={Package2}
            onClose={() => setSelectedProduct(null)}
          >
            <div className="p-6 space-y-6">
              <div className="flex flex-col items-center md:flex-row gap-6">
                <div className="w-48 h-48 bg-gradient-to-br from-blue-100 to-yellow-100 rounded-xl flex items-center justify-center">
                
                  <img 
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>

                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-600">
                      {selectedProduct.name}
                    </h3>
                    <p className="text-gray-600 mt-1">
                      {selectedProduct.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Price</p>
                      <p className="text-2xl font-bold text-green-600">
                        ${selectedProduct.price}
                      </p>
                    </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        selectedProduct.status,
                        selectedProduct.stock
                      )}`}
                    >
                      {getStatusText(
                        selectedProduct.status,
                        selectedProduct.stock
                      )}
                    </span>
                  </div>
                    <div>
                      <p className="text-sm text-gray-500">Category</p>
                      <p className="font-medium text-gray-900">
                        {selectedProduct.category}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Rating</p>
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        <span className="font-medium">
                          {selectedProduct.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              

              <div className="flex gap-3 pt-4 border-t">
                <Button
                  onClick={() => handleDeleteProduct(selectedProduct.id)}
                  variant="outline"
                  iconType="icon-left"
                  Icon={Trash2}
                  iconSize={16}
                  className="!border-red-300 !text-red-600 hover:!bg-red-50"
                >
                  Delete
                </Button>
                <Button
                  onClick={() => setSelectedProduct(null)}
                  variant="primary"
                  className="flex-1"
                >
                  Close
                </Button>
              </div>
            </div>
          </Modal>
        )}
      </div>

      <style jsx>{`
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

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default VendorProduct;
