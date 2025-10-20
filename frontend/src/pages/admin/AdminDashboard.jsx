import React from "react";
import {
  Users,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  Bell,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Plus,
  BarChart3,
  PieChart,
  Activity,
  Calendar,
  MapPin,
  Star,
  AlertCircle,
  UserCircle2,
  Mail,
  ShoppingBagIcon,
} from "lucide-react";
import Button from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

const AdminDashboard = () => {
    const navigator = useNavigate();
    const vendors = useAuthStore((state)=> state.vendors);

  // Mock data for dashboard
  const statsData = [
    {
      title: "Total Users",
      value: "2,847",
      change: "+12.5%",
      changeType: "increase",
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "Total Orders",
      value: "1,423",
      change: "+8.2%",
      changeType: "increase",
      icon: ShoppingCart,
      color: "bg-green-500",
    },
  ];

  const newUsers = [
    { name: "Alice Johnson", email: "alice@email.com" , joined: "2 hours ago" },
    { name: "Bob Smith", email: "bob@email.com" , joined: "5 hours ago" },
    { name: "Charlie Brown", email: "  ", joined: "1 day ago" },
    { name: "Diana Prince", email: "pp@emailcom" , joined: "2 days ago" },
  ];

  const newVendors = vendors.slice(0,4); 



  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {statsData.map((stat, index) => (
          <div
            key={index}
            className="bg-white bg-gradient-to-br from-blue-400 to-blue-700 rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-yellow-300`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span
                className={`text-sm font-medium ${
                  stat.changeType === "increase"
                    ? "text-green-100"
                    : "text-red-600"
                }`}
              >
                {stat.change}
              </span>
            </div>
            <h3 className="text-gray-100 text-sm font-medium mb-1">
              {stat.title}
            </h3>
            <p className="text-3xl font-bold text-gray-100">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Alerts Section */}
      <div className=" bg-white rounded-xl mb-8 shadow-sm border border-gray-200">
        <div className="bg-gradient-to-br from-blue-200 px-5 to-blue-100 flex items-center gap-2 p-2 rounded-t-xl">
          <AlertCircle className="w-5 h-5 text-orange-600" />
          <h2 className="text-xl font-semibold text-gray-900">System Alerts</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4 text-yellow-600" />
              <span className="font-medium text-yellow-800">
                Low Stock Alert
              </span>
            </div>
            <p className="text-sm text-yellow-700">
              5 vendors have items running low on stock
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-blue-600" />
              <span className="font-medium text-blue-800">
                New Registrations
              </span>
            </div>
            <p className="text-sm text-blue-700">
              12 new vendor applications pending review
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Charts Section */}
        <div className="lg:col-span-2 bg-gradient-to-br from-blue-400 to-blue-700  rounded-xl shadow-sm border border-gray-200">
          <div className="bg-blue-50 rounded-t-xl flex items-center justify-between p-3">
            <h2 className="text-xl font-semibold text-gray-900">
                <BarChart3 className="inline-block mr-5 text-blue-500" />
                Analytics Overview
            </h2>
          </div>

          {/* Placeholder for chart - you can integrate with Chart.js or similar */}
          <div className="p-6">
          <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center border-2 border-dashed border-blue-200">
            <div className="text-center">
              <Activity className="w-12 h-12 text-blue-400 mx-auto mb-3" />
              <p className="text-gray-600 font-medium">Analytics Chart</p>
              <p className="text-sm text-gray-500">
                Revenue and order trends visualization
              </p>
            </div>
          </div>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="bg-gradient-to-br from-blue-200 to-blue-100 px-5 py-3 rounded-t-xl flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
                <Users className="inline-block mr-5 text-green-500" />
              New Users
            </h2>
          </div>

          <div className="p-6">
          <div className=" space-y-4">
            {newUsers.map((user, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <UserCircle2 className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium `}
                    >
                      {user.joined}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
            <Button 
                variant="outline" 
                className="w-full mt-4"
                onClick={()=>{navigator("/admin/users")}}
            >
            View All Users
          </Button>
          </div>
          


        </div>

        {/* Top Vendors */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 ">
          <div className="bg-gradient-to-br from-blue-200 to-blue-100 px-5 py-3 rounded-t-xl flex items-center">
            <ShoppingBagIcon className="w-5 h-5 text-white mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">Top Vendors</h2>
          </div>

            <div className="p-6">
          <div className="space-y-4">
            {newVendors.map((vendor, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                        <ShoppingCart className="text-white w-6 h-6" />
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{vendor.name}</p>
                    <div className="flex items-center gap-1">
                      <Mail className="w-4 h-4 text-yellow-400 " />
                      <span className="text-sm text-gray-600">
                        {vendor.email}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    {vendor.type}
                  </p>
                  <p className="text-sm text-gray-600">
                    {vendor.status}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Button variant="outline" className="w-full mt-4">
            Manage Vendors
          </Button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
