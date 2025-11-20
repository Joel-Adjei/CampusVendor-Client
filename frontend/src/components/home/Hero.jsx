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
        <CarouselItem>
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
      <div className="absolute w-40 h-[900px] bg-amber-300 -top-30 right-2 md:right-40 rotate-12 z-0" />

      <BlurFade direction="top" duration={0.5} inView>
        <div className={``}>
          <p className="font-Montserrat font-thin leading-none text-gray-600">
            Get Your
          </p>
          <h3 className="text-[140px] stroke-3 stroke-black leading-none font-Delirium text-blue-700 font-light">
            Sneakers
          </h3>
          <Button className={"hidden md:flex"} variant="secondary">
            Explore
          </Button>
        </div>
      </BlurFade>
      <div className={``}>
        <BlurFade direction="bottom" duration={0.6} delay={0.3}>
          <img
            src={images.sneaker}
            className="size-70 md:size-110 object-contain "
          />
        </BlurFade>
      </div>
      <Button className={"flex md:hidden text-md z-20"} variant="primary">
        Explore
      </Button>
    </div>
  );
};

const HeroSection2 = () => {
  return (
    <div className="h-full flex flex-col justify-center md:flex-row md:justify-between gap-6 bg-slate-50">
      <BlurFade direction="right" duration={0.5} inView>
        <div className="w-full h-full flex flex-col items-center gap-2 px-6 pt-9 md:items-start md:justify-center lg:pl-42">
          <h3 className=" font-Delirium font-light text-8xl md:text-[120px] text-blue-300 leading-13 text-center md:text-left">
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
        className={"h-100 md:h-120 self-end"}
      >
        <div className="h-100 md:h-120 self-end">
          <img
            src={heroImages.heroImg2}
            alt="Hero Image"
            className="object-contain h md:h-full"
          />
        </div>
      </BlurFade>
    </div>
  );
};
