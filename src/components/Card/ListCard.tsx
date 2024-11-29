"use client";

import * as React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import { useInView } from "react-intersection-observer";
import { Item } from "@/lib/types";
import "moment/locale/vi";
import { Button } from "../ui/button";
import { Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";
import BookmarkButton from "../BookmarkButton";

moment.locale("vi");

export interface ListCardProps {
  data: Item;
}

export default function ListCard({ data }: ListCardProps) {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <div>
      <div ref={ref}></div>
      {inView && (
        <Link href={`/comics/${data.slug}`}>
          <Card className="flex flex-row">
            <CardHeader className="p-2 relative group/listCard overflow-hidden">
              <Image
                alt=""
                src={`${process.env.NEXT_PUBLIC_IMG_URL}/uploads/comics/${data.thumb_url}`}
                width={0}
                height={0}
                sizes="100vw"
                className="aspect-square object-cover size-[170px]"
              />
              <BookmarkButton
                className="sm:absolute top-2 -right-10 transition-all duration-500 sm:group-hover/listCard:-translate-x-14"
                data={data}
              />
            </CardHeader>
            <CardContent className="p-4 pl-0">
              <div className="font-bold line-clamp-3 text-ellipsis">
                {data.name}
              </div>
              <div className="text-xs text-gray-400 italic">
                {moment(data.updatedAt).fromNow()}
              </div>
              <div className="text-sm">{`${
                data.chaptersLatest && data.chaptersLatest.length > 0
                  ? `Chapter ${data.chaptersLatest[0].chapter_name}`
                  : ""
              }`}</div>
              <div className="flex flex-row items-center flex-wrap">
                {data.category.map((cate) => (
                  <div
                    key={cate.id}
                    className="rounded-full px-1.5 bg-black text-white m-0.5 text-xs"
                  >
                    {cate.name}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </Link>
      )}
    </div>
  );
}
