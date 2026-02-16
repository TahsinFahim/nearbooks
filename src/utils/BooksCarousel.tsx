"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Pencil, Tag } from "lucide-react";
import { Book } from "@/types/book";
import Autoplay from "embla-carousel-autoplay";

interface BooksCarouselProps {
  books: Book[];
}

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");

const getDiscountedPrice = (price: number, discountPercentage: number) => {
  if (!discountPercentage || discountPercentage <= 0) return price;
  return Math.round(price - (price * discountPercentage) / 100);
};

export const BooksCarousel: React.FC<BooksCarouselProps> = ({ books }) => {
  const loopedBooks = [...books, ...books];

  return (
    <div className="w-full px-4 md:px-8 pb-8 md:pb-12 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 3500,
              stopOnInteraction: false,
              stopOnMouseEnter: true,
            }),
          ]}
          className="w-full relative"
        >
          <CarouselContent className="-ml-3 md:-ml-5">
            {loopedBooks.map((book, index) => {
              const discount = book.discount_parcentage || 0;
              const discountedPrice = getDiscountedPrice(
                Number(book.price),
                discount
              );

              return (
                <CarouselItem
                  key={`${book.id}-${index}`}
                  className="group pl-3 md:pl-5 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 min-w-[45%] sm:min-w-[30%] md:min-w-[23%] lg:min-w-[18%] xl:min-w-[23%]"
                >
                  <div className="relative bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-2xl transition-all duration-300 h-full flex flex-col shadow-sm hover:shadow-xl">
                    {/* Discount Badge */}
                    {discount > 0 && (
                      <div className="absolute top-4 left-4 z-10">
                        <div className="inline-flex items-center px-3 py-1.5 rounded-lg bg-gradient-to-r from-red-600 to-red-500 text-white text-xs font-bold tracking-wide shadow-lg">
                          <Tag className="w-3 h-3 mr-1.5" />
                          {discount}% OFF
                        </div>
                      </div>
                    )}

                    {/* Book Cover */}
                    <div className="relative h-64 p-4 bg-gradient-to-br from-gray-50 to-gray-100">
                      <div className="relative w-full h-full overflow-hidden rounded-xl shadow-inner">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${book.cover_image}`}
                          alt={book.title || "Book Cover"}
                          fill
                          className="rounded-lg transition-all duration-500 group-hover:scale-105 object-contain group-hover:brightness-105"
                          
                          priority={index < 6}
                        />
                      </div>
                    </div>

                    {/* Book Info */}
                    <div className="p-2 flex flex-col flex-grow border-t border-gray-100 bg-white">
                      <Link
                        href={`/${slugify(book.title)}/${book.id}`}
                        className="flex flex-col flex-grow group/link"
                      >
                        <div className="mb-1">
                          <p className="text-xs font-medium text-gray-500 mb-2  uppercase ">
                            {book.publisher?.name || book.sub_category?.name || "Unknown Publisher"}
                          </p>

                          <h3 className="text-base font-bold text-gray-900 mb-3 line-clamp-2 leading-snug group-hover/link:text-blue-700 transition-colors duration-200">
                            {book.title || "Book Title"}
                          </h3>

                          <div className="flex items-start  gap-1.5 ">
                            <div className="flex items-center justify-center w-5 h-5 rounded-full bg-gray-100">
                              <Pencil className="w-3 h-3 text-gray-500" />
                            </div>
                            <span className="text-xs text-gray-600 font-medium">
                              {book.author?.name || book.sub_category?.name || "Unknown Author"}
                            </span>
                          </div>
                        </div>

                        {/* Price Section */}
                        <div className="mt-auto pt-2 border-t border-gray-100">
                          <div className="flex items-center gap-2 mb-2">
                            {discount > 0 && (
                              <span className="text-gray-400 text-sm line-through font-medium">
                                ৳{Number(book.price).toLocaleString()}
                              </span>
                            )}
                            <span className="text-xl font-bold text-gray-900">
                              ৳{discountedPrice.toLocaleString()}
                            </span>
                          </div>
                          {book.pdf_price && ( <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-50 to-blue-100/50 rounded-xl border border-blue-200/50"> <div className="flex items-center gap-2"> <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center"> <div className="w-5 h-5 rounded-sm bg-gradient-to-br from-blue-600 to-blue-800"></div> </div> <div className="flex flex-col"> <span className="text-xs font-semibold text-blue-900">Digital Edition</span> <span className="text-xs text-gray-600">Instant Download</span> </div> </div> <span className="text-lg font-bold text-gray-900"> ৳{Number(book.pdf_price).toLocaleString()} </span> </div> )}
                        </div>
                      </Link>
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>

          {/* Carousel Navigation */}
          <CarouselPrevious className="absolute left-2 md:-left-14 top-1/2 -translate-y-1/2 z-10 h-12 w-12 bg-white/90 backdrop-blur-sm border border-gray-200 text-gray-700 hover:bg-white hover:border-gray-300 hover:shadow-xl shadow-lg transition-all duration-300 rounded-full flex items-center justify-center hover:scale-105" />
          <CarouselNext className="absolute right-2 md:-right-14 top-1/2 -translate-y-1/2 z-10 h-12 w-12 bg-white/90 backdrop-blur-sm border border-gray-200 text-gray-700 hover:bg-white hover:border-gray-300 hover:shadow-xl shadow-lg transition-all duration-300 rounded-full flex items-center justify-center hover:scale-105" />
        </Carousel>
      </div>
    </div>
  );
};