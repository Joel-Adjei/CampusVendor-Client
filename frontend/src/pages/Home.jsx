import { useQuery } from "@tanstack/react-query";
import React from "react";
import axios from "../lib/axios";
import { toast } from "react-toastify";
import { CarouselItem } from "@/components/ui/carousel";
import CusCarousel from "@/components/ui/custom/Carousel";
import { shortenText } from "@/lib/utils";
import Button from "@/components/ui/custom/Button";
import { BlurFade } from "@/components/ui/blur-fade";
import { FaCartPlus, FaShoppingBasket, FaStore } from "react-icons/fa";

const Home = () => {
  const { data } = useQuery({
    queryKey: ["list-products"],
    queryFn: async () => {
      try {
        const response = await axios.get("/products?limit=6&offset=0");
        return response.data;
      } catch (error) {
        toast.error("Failed to fetch products");
        console.log("Error fetching products:", error);
      }
    },
  });

  const { data: categories } = useQuery({
    queryKey: ["list-categories"],
    queryFn: async () => {
      try {
        const response = await axios.get("/categories?limit=6");
        return response.data;
      } catch (error) {
        toast.error("Failed to fetch categories");
        console.log("Error fetching categories:", error);
      }
    },
  });

  return (
    <div>
      <section className="h-60 md:h-100 w-full bg-gray-600">
        <CusCarousel data={data}>
          {data?.map((item) => (
            <CarouselItem key={item.id}>
              <div className="h-60 md:h-100 w-full relative flex-shrink-0">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />
                <div className=" h-1/2 w-full bg-gradient-to-t from-gray-800 to-gray-200/0 absolute bottom-0" />
                <div className="absolute bottom-4 left-2 md:left-4 px-3 py-1 rounded">
                  <h3 className="text-gray-100 font-semibold font-Montserrat text-2xl md:text-4xl">
                    {item.title}
                  </h3>

                  <p className="text-gray-200 text-sm">
                    {shortenText(item.description, 70)}
                  </p>
                  <Button variant={"secondary"} className="mt-3">
                    View Details
                  </Button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CusCarousel>
      </section>

        <BlurFade>
          <section className="my-12 px-4 md:px-8 lg:px-16">
            <h2 className="text-2xl font-semibold mb-6 text-center text-blue-900 font-Montserrat">
              <FaStore className="inline-block mr-2 text-2xl text-amber-400 mb-1" />
              Categories
              
            </h2>
            <div className="grid grid-cols-3 lg:grid-cols-6 gap-3 gap-y-6">
              {categories?.map((category) => (
                <div
                  key={category.id}
                  className="flex flex-col items-center rounded-lg hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="w-16 h-16  rounded-full border-2 border-amber-300 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover mb-2"
                    />
                  </div>
                  <h3 className="text-sm font-medium text-center text-gray-500">
                    {category.name}
                  </h3>
                </div>
              ))}
            </div>
          </section>
        </BlurFade>

        <BlurFade
        >
          <section className="h-50 lg:h-95 w-full grid grid-cols-4 gap-2 bg-slate-100/50 py-4 px-4 md:px-8 lg:px-16">
            <div className="bg-blue-800 rounded-lg row-span-2 col-span-3"></div>
            <div className="bg-black rounded-lg"></div>
            <div className="bg-black rounded-lg"></div>
          </section>
        </BlurFade>
    </div>
  );
};

export default Home;
