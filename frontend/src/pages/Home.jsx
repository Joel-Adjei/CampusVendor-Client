import { useQuery } from "@tanstack/react-query";
import React from "react";
import axios from "../lib/axios";
import { toast } from "react-toastify";
import { CarouselItem } from "@/components/ui/carousel";
import CusCarousel from "@/components/ui/custom/Carousel";
import { shortenText } from "@/lib/utils";
import Button from "@/components/ui/custom/Button";
import { BlurFade } from "@/components/ui/blur-fade";
import {
  FaCartPlus,
  FaShoppingBasket,
  FaShoppingCart,
  FaStore,
} from "react-icons/fa";
import { icons, images } from "@/assets/assets";
import Title from "@/components/ui/custom/Title";
import Hero from "@/components/home/Hero";
import ProductCard from "@/components/ui/ProductCard";
import { Badge, Tag } from "lucide-react";
import usePageTitle from "@/hooks/usePageTitle";

const Home = () => {
  usePageTitle({ title: "Home" });

  const { data } = useQuery({
    queryKey: ["list-products"],
    queryFn: async () => {
      try {
        const response = await axios.get("/products?limit=6");
        return response.data.products;
      } catch (error) {
        // toast.error("Failed to fetch products");
        console.log("Error fetching products:", error);
      }
    },
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      try {
        const response = await axios.get("/products/categories?limit=6");
        return response.data || [];
      } catch (error) {
        // toast.error("Failed to fetch categories");
        console.log("Error fetching categories:", error);
      }
    },
  });

  const { data: cate2 } = useQuery({
    queryKey: ["category-2"],
    queryFn: async () => {
      try {
        const response = await axios.get("/products?skip=11&limit=20");
        return response.data.products;
      } catch (error) {
        // toast.error("Failed to fetch categories");
        console.log("Error fetching categories:", error);
      }
    },
  });

  return (
    <div>
      <div>
        <Hero />
      </div>

      <BlurFade>
        <section className="my-12 px-4 md:px-8 lg:px-16">
          <div className="mb-4">
            <Title title={"Categories"} />
          </div>

          <div className="grid grid-cols-3 lg:grid-cols-6 gap-3 gap-y-6">
            {categories?.slice(0, 6).map((category) => (
              <div
                key={category.id}
                className="flex flex-col items-center rounded-lg hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="w-15 h-15  rounded-sm border-2 border-amber-300 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover mb-2"
                  />
                </div>
                <h3 className="text-xs md:text-sm font-medium text-center text-gray-500">
                  {category.name}
                </h3>
              </div>
            ))}
          </div>
        </section>
      </BlurFade>

      <section className="relative h-45 md:h-95 w-full bg-transparent mb-7">
        <CusCarousel data={data}>
          {data?.map((item) => (
            <CarouselItem key={item.id} className={"md:basis-[70%] "}>
              <div className="px-4 md:px-0">
                <div className="h-45 md:h-95 w-full relative flex-shrink-0 rounded-2xl overflow-hidden">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                  <div className=" h-1/2 w-full bg-gradient-to-t from-gray-800 to-gray-200/0 absolute bottom-0" />
                  <div className="absolute bottom-4 left-2 md:left-4 px-3 py-1 rounded">
                    <h3 className="text-gray-100 font-semibold font-Montserrat text-xl line-clamp-1 sm:text-2xl md:text-4xl">
                      {item.title}
                    </h3>

                    <p className="text-gray-200 text-xs md:text-sm line-clamp-2">
                      {item.description}
                    </p>
                    <Button variant={"secondary"} className="mt-3 w-fit px-1">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CusCarousel>
      </section>

      <section className=" py-3">
        <div className="flex items-center gap-1 bg-gradient-to-br from-blue-700 to-blue-500 border-r-15 border-amber-300 w-full pl-7 lg:pl-19  py-2">
          <img src={icons.titleCart} className="w-6 h-6" />
          {/* <Tag size={23} className="text-amber-200" /> */}
          <h2 className="text-lg md:text-xl font-Montserrat font-semibold text-slate-100">
            Top Products
          </h2>
        </div>
        <div className="px-4 lg:px-16 md:px-8">
          <CusCarousel autoplay={false} loop={false} showNavigation={false}>
            {data?.map((product) => (
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
      </section>

      <BlurFade inView blur="0">
        <section className=" py-3 mb-4">
          <div className="flex items-center gap-1 bg-gradient-to-br from-blue-700 to-blue-500 border-r-15 border-amber-300 w-full pl-7 lg:pl-19  py-2">
            {/* <Tag size={23} className="text-amber-200" /> */}
            <img src={icons.titleCart} className="w-6 h-6" />
            <h2 className="text-lg md:text-xl font-Montserrat font-semibold text-slate-100">
              Electronics
            </h2>
          </div>
          <div className="px-4 lg:px-16 md:px-8">
            <CusCarousel autoplay={false} loop={false} showNavigation={false}>
              {cate2?.map((product) => (
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
        </section>
      </BlurFade>

      <BlurFade inView blur="0">
        <section className="h-50 sm:h-70 lg:h-95 w-full grid grid-cols-4 gap-2 bg-slate-100/50 py-4 px-4 md:px-8 lg:px-16">
          <div className="relative bg-gradient-to-br from-blue-800 to-blue-500 rounded-lg row-span-2 col-span-3 overflow-hidden">
            <div className="h-240 w-60 bg-white absolute -rotate-45 -top-76 -right-80 md:-right-50 " />

            <div className="relative h-full font-Montserrat">
              <div className="h-full flex justify-center items-center z-10 px-4">
                <div className="w-1/2">
                  <h3 className=" text-lg md:text-3xl leading-4 sm:leading-none font-semibold font-Montserrat text-white">
                    Phones and accessories
                  </h3>
                  {/* <p className="text-gray-200 text-xs md:text-lg">
                    Get access to the latest smartphones and accessories
                  </p> */}
                  <Button
                    variant={"secondary"}
                    Icon={FaShoppingCart}
                    iconType="icon-right"
                    className="mt-4 text-md"
                  >
                    Shop
                  </Button>
                </div>
                <div className="">
                  <img
                    src={images.iphone}
                    className=" w-30 sm:w-40 md:w-75 object-contain z-10"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-200 rounded-lg overflow-hidden">
            <div className="w-full h-full flex items-center justify-center ">
              <img
                src={images.cosmetics}
                className="w-50 h-full object-contain"
              />
            </div>
          </div>
          <div className="bg-black rounded-lg overflow-hidden">
            <div className="w-full h-full flex items-center justify-center ">
              <img src={images.shoe} className="w-full h-full object-cover" />
            </div>
          </div>
        </section>
      </BlurFade>

      <BlurFade inView blur="0">
        <section className="px-4 md:px-8 lg:px-16">
          <div className="mb-4">
            <Title title={"Popular Products"} />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {cate2?.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                image={product.images[0]}
                title={product.title}
                description={product.description}
                price={product.price}
                rating={product.rating}
                reviewsCount={product.reviews.length}
                category={product.category?.name}
              />
            ))}
          </div>
        </section>
      </BlurFade>
    </div>
  );
};

export default Home;
