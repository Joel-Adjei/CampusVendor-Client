// ...existing code...
import { CarouselItem } from "@/components/ui/carousel";
import Button from "@/components/ui/custom/Button";
import CusCarousel from "@/components/ui/custom/Carousel";
import Title from "@/components/ui/custom/Title";
import ProductCard from "@/components/ui/ProductCard";
import { getRatingStars } from "@/lib/minComp";
import { formatPrice } from "@/lib/utils";
import { BookMarked } from "lucide-react";
import React, { useState } from "react";
import { FaShoppingCart, FaUser } from "react-icons/fa";

const images = [
  "https://picsum.photos/id/1018/800/800",
  "https://picsum.photos/id/1015/800/800",
  "https://picsum.photos/id/1025/800/800",
  "https://picsum.photos/id/1005/800/800",
];

const Icon = ({ children }) => (
  <div className="w-10 h-10 rounded-lg bg-white/30 flex items-center justify-center shadow-sm">
    {children}
  </div>
);

const ProductDetails = () => {
  const [selected, setSelected] = useState(0);
  const [type, SetType] = useState("ser");

  const ratingStats = [
    { label: 5, reviews: 30 },
    { label: 4, reviews: 37 },
    { label: 3, reviews: 40 },
    { label: 2, reviews: 10 },
    { label: 1, reviews: 5 },
  ];

  const rateParcentage = (reviews) => {
    const totalReview = 122;
    return (reviews / 122) * 100;
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50 font-Montserrat flex items-center justify-center">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left - Gallery */}
        <div className="flex flex-col gap-4">
          <div className="relative rounded-xl overflow-hidden shadow-2xl transform transition duration-500 hover:scale-105 animate-float">
            <img
              src={images[selected]}
              alt="product"
              className="w-full h-[460px] object-cover"
            />
            <div className="absolute top-3 left-3 flex gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold text-white bg-[var(--navy)]/90">
                New
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium text-[var(--navy)] bg-white/90">
                Free shipping
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            {images.map((src, i) => (
              <button
                key={src}
                onClick={() => setSelected(i)}
                className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
                  i === selected
                    ? "border-[var(--blue)] scale-105 shadow-lg"
                    : "border-transparent"
                }`}
              >
                <img
                  src={src}
                  alt={`thumb-${i}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right - Info */}
        <div className="px-1 md:px-4 py-6 flex flex-col gap-6">
          <div className="flex flex-col items-start justify-between gap-4">
            <div>
              <h1 className="text-xl md:text-3xl font-semibold text-[var(--navy)] mb-2">
                Urban Traveler Backpack
              </h1>
              <p className="text-gray-700 leading-relaxed text-sm md:text-md">
                A thoughtfully designed backpack for city commutes and weekend
                adventures. Water-resistant fabric, organized compartments, and
                comfortable straps make this a daily carry staple.
              </p>
            </div>

            <div className="flex items-center gap-2 text-right">
              <div className=" text-gray-500 text-sm">Price: </div>
              <div className="text-xl font-bold text-[var(--navy)]">
                {formatPrice(126)}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-2">
            {/* <button
              className="relative px-6 py-3 rounded-lg text-white font-semibold overflow-hidden shadow-xl transform transition hover:scale-105 focus:outline-none add-to-cart"
              aria-label="Add to cart"
            >
              <span className="relative z-10">Add to cart</span>
              <svg
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 z-10"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="10" cy="20" r="1" fill="currentColor" />
                <circle cx="18" cy="20" r="1" fill="currentColor" />
              </svg>
            </button> */}

            {type == "product" ? (
              <Button Icon={FaShoppingCart} iconType="icon-right">
                Add to cart
              </Button>
            ) : (
              <Button Icon={BookMarked} iconType="icon-right" iconSize={20}>
                Book Appointment
              </Button>
            )}
          </div>

          <div className="bg-[var(--light)] mt-2 rounded-lg shadow-md p-3 md:p-6 ">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center gap-0.5">
                {getRatingStars(4)}
              </div>
              <span className="text-sm text-gray-700">1.2k reviews</span>
            </div>

            <div className="space-y-2">
              {ratingStats.map(({ label, reviews }) => (
                <div key={label} className="flex items-center gap-2">
                  <p className="w-[15%] sm:w-[10%] text-gray-600 text-xs font-semibold">
                    {label} <span className="font-light">({reviews})</span>
                  </p>
                  <div className="flex-1 h-2 bg-gray-50 rounded-full overflow-hidden">
                    <div
                      style={{
                        width: `${rateParcentage(reviews)}%`,
                      }}
                      className="h-full bg-amber-300"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="px-2">
            <div className="mb-3">
              <Title title={"Customer Reviews"} />
              <h3 className="text-center text-gray-600 text-xs">
                Reviews from customers
              </h3>
            </div>

            <div className="space-y-4 ">
              {[1, 2, 3].map((index) => (
                <div
                  key={index}
                  className="bg-slate-50 border border-amber-100 rounded-md p-3"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="size-8 flex items-center justify-center rounded-full bg-gray-300">
                      <FaUser className="text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-700">Customer Name</p>
                      <div className="flex items-center text-sm">
                        {getRatingStars(index)}
                      </div>
                    </div>
                  </div>

                  <div className="text-gray-500 text-sm p-3 border-t border-gray-200">
                    <p>Message here</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related Product */}
      <div>
        <div className="px-4 lg:px-16 md:px-8">
          <CusCarousel autoplay={false} loop={false} showNavigation={false}>
            {[]?.map((product) => (
              <CarouselItem
                key={product.id}
                className={"basis-1/2 md:basis-1/4 lg:basis-1/6 py-6"}
              >
                <ProductCard
                  product={product}
                  image={product.images[0]}
                  title={product.title}
                  description={product.description}
                  price={product.price}
                  rating={product.rating}
                  reviewsCount={product.reviews.length}
                  category={product.category?.name}
                />
              </CarouselItem>
            ))}
          </CusCarousel>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
// ...existing code...
