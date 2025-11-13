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
    </div>
  );
};

export default VendorHome;
