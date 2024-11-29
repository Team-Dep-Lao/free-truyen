"use client";
import * as React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import moment from "moment";
import Autoplay from "embla-carousel-autoplay";
import { PageData } from "@/lib/types";
import Link from "next/link";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import "moment/locale/vi";

moment.locale("vi");

export interface SectionCarouselProps {
  pageData: PageData | undefined;
  title?: string;
  autoPlay?: boolean;
  loop?: boolean;
}

export default function SectionCarousel({
  pageData,
  title,
  autoPlay = true,
  loop = false,
}: SectionCarouselProps) {
  return (
    <div className="flex flex-col space-y-4 sm:pb-0 pb-10">
      <div
        className={cn([
          "text-xl font-bold text-blue-500 uppercase",
          title ? "flex" : "hidden",
        ])}
      >
        {title}
      </div>
      <Carousel
        className="w-full h-[250px]"
        plugins={autoPlay ? [Autoplay()] : []}
        opts={{
          loop,
        }}
      >
        <CarouselContent>
          {pageData &&
            pageData.items.map((item, index) => (
              <CarouselItem key={index} className="sm:basis-1/5 basis-2/3">
                <div className="p-1">
                  <Card>
                    <CardHeader className="p-0">
                      <Link href={`/comics/${item.slug}`}>
                        <Image
                          alt=""
                          src={`${process.env.NEXT_PUBLIC_IMG_URL}/uploads/comics/${item.thumb_url}`}
                          width={0}
                          height={0}
                          sizes="100vw"
                          className=" aspect-square w-full"
                        />
                      </Link>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center p-2 bg-black text-white">
                      <div className="line-clamp-1 text-ellipsis">
                        {item.name}
                      </div>
                      <div className="text-xs flex items-center flex-wrap space-x-2">
                        <div className="">{`${
                          item.chaptersLatest && item.chaptersLatest.length > 0
                            ? `Chapter ${item.chaptersLatest[0].chapter_name}`
                            : ""
                        }`}</div>
                        <div className="flex items-center space-x-0.5 flex-nowrap">
                          <Clock className="size-3" />
                          <div className="">
                            {moment(item.updatedAt).fromNow()}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious className="left-0" />
        <CarouselNext className="right-0" />
      </Carousel>
    </div>
  );
}
