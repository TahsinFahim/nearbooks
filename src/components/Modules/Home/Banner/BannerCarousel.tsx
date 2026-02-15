"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { Button } from "@/components/ui/button"
import { ChevronsRight } from "lucide-react"
import { Banner } from "@/types/banner"

interface Props {
  banners: Banner[]
}

export default function BannerCarousel({ banners }: Props) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)

  React.useEffect(() => {
    if (!api) return

    setCurrent(api.selectedScrollSnap())
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  // Duplicate banners for smooth infinite loop if slides are few
  const loopedBanners = [...banners, ...banners]

  return (
    <section className="w-full px-5 pt-5  relative">
      <Carousel
        opts={{ loop: true, align: "start", skipSnaps: false }}
        setApi={setApi}
        plugins={[
          Autoplay({
            delay: 3500,
            stopOnInteraction: false,
            stopOnMouseEnter: false,
          }),
        ]}
      >
        <CarouselContent className="-ml-4">
          {loopedBanners.map((banner, index) => (
            <CarouselItem
              key={index}
              className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
            >
              <div className="relative h-[250px] rounded-xl overflow-hidden group">
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${banner.image_path}`}
                  alt={banner.title}
                  fill
                  priority
                  className=" group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/800 to-transparent" />

                <div className="absolute bottom-5 left-5 text-white">
                  

                  {banner.link && (
                    <Button
                      size="sm"
                      asChild
                      className="bg-red-600 hover:bg-red-700"
                    >
                      <Link
                        href={banner.link}
                        className="flex items-center gap-1"
                      >
                        Shop Now <ChevronsRight size={16} />
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* DOTS */}
      <div className="absolute pb-3 -bottom-1 left-1/2 -translate-x-1/2 flex gap-3">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`rounded-full transition-all duration-300 ${
              current % banners.length === index
                ? "bg-red-600 w-3 h-3"
                : "bg-gray-400 w-3 h-3 hover:bg-gray-600"
            }`}
          />
        ))}
      </div>
    </section>
  )
}
