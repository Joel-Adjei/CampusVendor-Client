import React from 'react'
import { Carousel, CarouselContent , CarouselItem , CarouselNext , CarouselPrevious } from '../carousel'
import Autoplay from 'embla-carousel-autoplay'

const CusCarousel = ({data, showNavigation = true , children}) => {
  return (
    <Carousel
        plugins={[Autoplay({ delay: 4000, stopOnInteraction: false })]}
        className={"relative w-full"}
        opts={{ loop: true }}
    >
        <CarouselContent>
            {children}
        </CarouselContent>
        { showNavigation &&
          <div className='absolute right-15 bottom-10 flex items-center'>
        <CarouselPrevious className={"absolute p-0 bg-gray-400/30 text-gray-100 hover:bg-gray-400/50 hover:text-white cursor-pointer"} />
        <CarouselNext className={"absolute p-0 bg-gray-400/30 text-gray-100 hover:bg-gray-400/50 hover:text-white cursor-pointer"}  />
        </div>}
    </Carousel>
  )
}

export default CusCarousel