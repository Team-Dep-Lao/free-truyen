"use client";

import * as React from "react";
import { useInView } from "react-intersection-observer";
import { Card, CardContent, CardHeader } from "../ui/card";
import Link from "next/link";
import Image from "next/image";
import { Item } from "@/lib/types";
import moment from "moment";
import { cn } from "@/lib/utils";
import "moment/locale/vi";

moment.locale("vi");

export interface GridCardProps {
  data: Item;
  className?: string;
  style?: React.CSSProperties;
}

export default function GridCard({ data, className, style }: GridCardProps) {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <div>
      <div ref={ref}></div>
      {inView && (
        <Card className={cn([className])} style={style ?? {}}>
          <CardHeader className="p-0">
            <Link href={`/comics/${data.slug}`}>
              <Image
                alt=""
                src={`${process.env.NEXT_PUBLIC_IMG_URL}/uploads/comics/${data.thumb_url}`}
                width={0}
                height={0}
                sizes="100vw"
                className="aspect-square object-cover w-full rounded-md"
              />
            </Link>
          </CardHeader>
          <CardContent className="p-2">
            <Link
              href={`/comics/${data.slug}`}
              className="font-bold line-clamp-3 text-ellipsis text-sm"
            >
              {data.name}
            </Link>
            <div className="flex flex-row mt-2 items-center flex-wrap">
              {data.category.map((cate) => (
                <Link
                  href={`/categories/${cate.slug}`}
                  key={cate.id}
                  className="rounded-full cursor-pointer px-1.5 bg-black m-0.5 text-white text-xs"
                >
                  {cate.name}
                </Link>
              ))}
            </div>
            <div className="flex flex-col mt-2">
              {data.chaptersLatest &&
                data.chaptersLatest.map((chapter, i) => (
                  <div className="text-xs my-1" key={i}>
                    {`Chapter ${chapter.chapter_name}`}
                  </div>
                ))}
            </div>
            <div className="text-gray-400 text-xs">
              {moment(data.updatedAt).fromNow()}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
