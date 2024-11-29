"use client";

import GridCard from "@/components/Card/GridCard";
import PaginationButton from "@/components/Collection/PaginationButton";
import GridCardSkeleton from "@/components/Skeleton/GridCardSkeleton";
import { Item, PageData } from "@/lib/types";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useEffect, useState } from "react";

export default function DetailCategory({
  slug,
  page,
}: {
  slug: string;
  page: number;
}) {
  const [pageData, setPageData] = useState<Item[]>([]);
  const [info, setInfo] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);

  async function onGet() {
    try {
      setLoading(true);
      const res = await axios.get(`/api/categories/${slug}?page=${page}`);

      setInfo(res.data);
      setPageData(res.data.items);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    onGet();
  }, [page]);

  return (
    <div className="px-1 flex-1 mt-8">
      <div
        className={cn(["mt-4 text-lg font-bold", info ? "flex" : "hidden"])}
      >{`Danh sách truyện thể loại ${info?.titlePage}`}</div>
      <div className="relative grid sm:grid-cols-5 grid-cols-2 gap-2 mt-4">
        {!loading
          ? pageData.map((item, idx) => (
              <GridCard data={item} key={idx} className="h-full" />
            ))
          : Array.from({ length: 20 }).map((_, idx) => (
              <GridCardSkeleton key={idx} />
            ))}
      </div>

      {info && <PaginationButton pageData={info} />}
    </div>
  );
}
