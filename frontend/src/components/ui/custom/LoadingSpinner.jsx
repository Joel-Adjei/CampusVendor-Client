import React from 'react';
import { ShoppingCart, Package, DollarSign } from 'lucide-react';
import { images } from '@/assets/assets';

/**
 * Custom Loading Spinner component for e-commerce, featuring an orbiting
 * Buy/Sell icon animation and customizable colors.
 *
 * @param {string} message - The fixed message displayed below the spinner (no internal cycling).
 * @param {string} themeColor - The primary Tailwind color for the spinner (e.g., 'green', 'indigo', 'yellow').
 */
const LoadingSpinner = ({ 
  message = "Loading...",
}) => {
  
  // Custom CSS for the exchange animation.
  const animationStyles = `
    @keyframes orbit {
      0% { transform: rotate(0deg) translateX(70px) rotate(0deg); }
      100% { transform: rotate(360deg) translateX(70px) rotate(-360deg); }
    }

    .icon-package {
      animation: orbit 3s linear infinite;
    }

    .icon-cart {
      animation: orbit 3s linear infinite reverse;
    }

    @keyframes pulse-center {
      0%, 100% { opacity: 0.6; transform: scale(1); }
      50% { opacity: 1; transform: scale(1.1); }
    }

    .icon-center {
      animation: pulse-center 2s ease-in-out infinite;
    }
  `;
const gradientbg ="bg-gradient-to-r from-blue-700 to-blue-500"

  return (
    // Inject the custom CSS animation styles
    <>
      <style>{animationStyles}</style>
      
      {/* Full screen dark overlay */}
      <div className=" flex items-center justify-center p-4 font-['Inter']">
        
        {/* Loading Card/Container */}
        <div className={` text-center max-w-sm w-full `}>
          
          {/* Icon Animation Area */}
          <div className="relative flex items-center justify-center h-40 mb-8">
            
            {/* This div creates the visible circular path for the orbiting icons */}
            <div className={`absolute w-36 h-36 border-2 border-blue-600/60 rounded-full `}></div>

            <div className={`absolute icon-center `}>
              <img 
                src={images.logo}
                alt="Logo"
                className="h-12 w-12 object-contain"
              />
            </div>

            {/* 2. Orbiting Icons (Package & ShoppingCart) */}
            <div className="absolute w-full h-full">
              
              {/* Package (Selling/Shipping) - Uses theme color */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={`icon-package absolute text-gray-200 ${gradientbg} p-2.5 rounded-full shadow-lg`}>
                  <Package className={`h-5 w-5 text-white`} />
                </div>
              </div>

              {/* Shopping Cart (Buying) - Keeps yellow for contrast */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={`icon-cart absolute text-gray-200 bg-gradient-to-r to-blue-700 from-blue-500 p-2.5 rounded-full shadow-lg`}>
                  <ShoppingCart className="h-5 w-5 text-amber-200" />
                </div>
              </div>

            </div>
          </div>

          {/* Loading Indicator and Text */}
          <div className="space-y-4">
            {/* Display the fixed message prop */}
            <p className="text-sm font-medium text-gray-400 h-6 transition-opacity duration-500">
              {message}
            </p>
          </div>

        </div>
      </div>
    </>
  );
};

export default LoadingSpinner;
