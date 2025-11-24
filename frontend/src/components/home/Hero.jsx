import { heroImages, images } from "@/assets/assets";
import React from "react";
import Button from "../ui/custom/Button";
import { BlurFade } from "../ui/blur-fade";
import { ArrowRight } from "lucide-react";
import CusCarousel from "../ui/custom/Carousel";
import { CarouselItem } from "../ui/carousel";

const Hero = () => {
  return (
    <section className=" h-[80vh] overflow-hidden">
      {/* <HeroSection1 /> */}
      <CusCarousel autoplay={true} interval={7000} showNavigation={false}>
        <CarouselItem >
          <HeroSection1 />
        </CarouselItem>
        <CarouselItem>
          <HeroSection2 />
        </CarouselItem>
      </CusCarousel>
    </section>
  );
};

export default Hero;

const HeroSection1 = () => {
  return (
    <div
      className={`relative h-full w-full flex flex-col items-center justify-center bg-slate-50 px-4 overflow-hidden
                     md:flex-row md:justify-center md:items-center md:gap-7 md:px-7 md:py-4`}
    >
      <div className="absolute size-40 bg-gray-100 rounded-full -bottom-20 -left-14" />
      <div className="absolute w-40 h-[900px] bg-slate-500/50 -top-30 right-2 md:right-50 rotate-12 z-0" />

      <BlurFade direction="top" duration={0.5} inView>
        <div className={``}>
          <p className="font-Montserrat font-light leading-none text-gray-600">
            Get Your
          </p>
          <h3 className="text-[140px] stroke-3 stroke-black leading-none font-Delirium text-slate-600 font-light">
            Sneakers
          </h3>
          <Button iconType="icon-right" className={"hidden md:flex text-white bg-gray-400 border-slate-500"} variant="outline" Icon={ArrowRight}>
            Explore
          </Button>
        </div>
      </BlurFade>
      <div className={``}>
        <BlurFade direction="bottom" duration={0.6} delay={0.3}>
          <img
            src={images.sneaker}
            className="size-70 md:h-90 lg:h-full lg:w-105 object-contain "
          />
        </BlurFade>
      </div>
          <Button iconType="icon-right" className={"flex md:hidden text-white bg-gray-400 border-slate-500"} variant="outline" Icon={ArrowRight}>
            Explore
          </Button>
    </div>
  );
};

const HeroSection2 = () => {
  return (
    <div className={`relative h-[80vh] w-full flex flex-col items-center justify-end bg-slate-50 px-4 overflow-hidden
                     md:flex-row-reverse md:justify-center md:items-center md:gap-7 md:px-7 md:py-4`}>
      
      <div className="absolute w-40 h-[900px] bg-blue-300/50 -top-30 right-2 md:left-50 rotate-12 z-0" />
      
      
      
      <BlurFade direction="right" duration={0.5} inView className={""}>
        <div className=" flex flex-col items-center gap-2 px-6 md:items-start md:justify-center ">
          <h3 className=" font-Delirium font-light text-8xl md:text-[120px] text-blue-500 leading-13 text-center md:text-left">
            Shop Faster <br />{" "}
          </h3>

          <h4 className="font-Montserrat text-4xl font-bold leading-none text-gray-500">
            On Campus
          </h4>
          <p className="text-center leading-4 md:text-left">
            Discover exclusive deals and offers from campus vendors.
          </p>
          <Button variant="secondary" Icon={ArrowRight} iconType="icon-right">
            Start Shopping
          </Button>
        </div>
      </BlurFade>

      <BlurFade
        direction="left"
        duration={0.6}
        delay={0.3}
        inView
        className={" md:h-120"}
      >
        <div className=" md:h-120">
          <img
            src={heroImages.phStore}
            alt="Hero Image"
            className="object-contain w-70 md:w-full md:h-full"
          />
        </div>
      </BlurFade>
    </div>
  );
};
