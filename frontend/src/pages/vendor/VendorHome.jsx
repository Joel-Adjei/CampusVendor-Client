import React, { useEffect } from "react";
import { BlurFade } from "@/components/ui/blur-fade";
import Button from "@/components/ui/custom/Button";
import {
  ShoppingBag,
  BarChart3,
  MessageCircle,
  Package,
  TrendingUp,
  Users,
  Bell,
  ArrowRight,
  MoreVertical,
} from "lucide-react";
// import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import { images } from "@/assets/assets";

const VendorHome = () => {
  const navigate = useNavigate();

  // Sample data for recent messages
  const recentMessages = [
    {
      id: 1,
      customer: "Sarah Johnson",
      message: "Hi, is this product still available?",
      time: "2 min ago",
      unread: true,
    },
    {
      id: 2,
      customer: "Mike Chen",
      message: "Thank you for the quick delivery!",
      time: "15 min ago",
      unread: false,
    },
    {
      id: 3,
      customer: "Emma Davis",
      message: "Can I get a bulk discount?",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: 4,
      customer: "Alex Wilson",
      message: "Product quality is excellent!",
      time: "2 hours ago",
      unread: false,
    },
  ];



  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Welcome Banner */}
      <BlurFade direction="bottom" blur="0" delay={0.1}>
        <div className="relative h-45 bg-gradient-to-br flex items-center from-blue-700 to-blue-400 w-full rounded-3xl p-6 mb-6 ">
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-4">
              {/* Profile Avatar Placeholder */}
              <div className="w-30 h-30 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30 flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-white text-3xl font-bold mb-1">
                  Welcome,<span className="text-yellow-300"> Joel</span>
                </h1>
                <p className="text-blue-100 text-sm">Joel Adjei</p>
              </div>
            </div>
          </div>

          <div className="absolute  hidden sm:block -bottom-20 -right-15 h-50 w-100 bg-white opacity-30 rounded-[200%] pointer-events-none">

          </div>

          {/* Illustration */}
          <div className="absolute bottom-0 right-7 hidden sm:block">
            <img
              src={images.vendorIllustration}
              alt="E-commerce illustration"
              className=" w-60 h-50 object-contain"
            />
          </div>
        </div>
      </BlurFade>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Orders Section */}
        <BlurFade direction="bottom" blur="0" delay={0.2} className={""}>
          <div className="bg-blue-600 rounded-3xl p-6 text-white h-64 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <ShoppingBag className="w-6 h-6" />
                <h2 className="text-xl font-semibold">Orders</h2>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-blue-100">New Orders</span>
                  <span className="font-bold">24</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-100">Processing</span>
                  <span className="font-bold">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-100">Completed</span>
                  <span className="font-bold">156</span>
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 w-full"
              onClick={() => navigate("/vendor/orders")}
            >
              View All Orders
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </BlurFade>

        {/* Chart Section */}
        <BlurFade
          direction="bottom"
          blur="0"
          delay={0.3}
          className={"lg:col-span-2 "}
        >
          <div className="bg-white rounded-3xl p-6 border border-yellow-300 h-64">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <BarChart3 className="w-6 h-6 text-gray-600" />
                <h2 className="text-xl font-semibold text-gray-800">Chart</h2>
              </div>
              <div className="text-sm text-gray-500">Weekly Sales</div>
            </div>

            {/* Simple Bar Chart */}
            <div className="flex items-end justify-between h-32 gap-2">
              
            </div>
          </div>
        </BlurFade>
      </div>

      {/* Recent Messages Section */}
      <BlurFade direction="bottom" blur="0" delay={0.4}>
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <MessageCircle className="w-6 h-6 text-gray-600" />
              <h2 className="text-xl font-semibold text-gray-800">
                Recent messages
              </h2>
            </div>
            <Button
              variant="outline"
              className="text-gray-600 hover:text-blue-600"
            >
              View All
            </Button>
          </div>

          <div className="space-y-4">
            {recentMessages.map((message) => (
              <div
                key={message.id}
                className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-medium text-sm">
                    {message.customer
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-gray-800">
                      {message.customer}
                    </h4>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">
                        {message.time}
                      </span>
                      {message.unread && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm truncate">
                    {message.message}
                  </p>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="flex gap-3">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <MessageCircle className="w-4 h-4 mr-2" />
                New Message
              </Button>
              <Button variant="outline" className="text-gray-600">
                <Bell className="w-4 h-4 mr-2" />
                Mark All Read
              </Button>
            </div>
          </div>
        </div>
      </BlurFade>
    </div>
  );
};

export default VendorHome;
