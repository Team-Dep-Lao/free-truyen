"use client";

import GridCard from "@/components/Card/GridCard";
import PaginationButton from "@/components/Collection/PaginationButton";
import GridCardSkeleton from "@/components/Skeleton/GridCardSkeleton";
import useLoading from "@/hooks/useLoading";
import { Item, PageData } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function DetailCategory({
  info,
  pageData,
}: {
  info: PageData | null;
  pageData: Item[];
}) {
  const loading = useLoading([pageData]);

  return (
    <div className="px-1 flex-1 mt-8">
      <div
        className={cn(["mt-4 text-lg font-bold", info ? "flex" : "hidden"])}
      >{`Danh sách truyện thể loại ${info?.titlePage}`}</div>
      <div className="relative grid sm:grid-cols-5 grid-cols-2 gap-2 mt-4">
        {!loading
          ? pageData.map((item) => (
              <GridCard data={item} key={item._id} className="h-full" />
            ))
          : Array.from({ length: 20 }).map((_, idx) => (
              <GridCardSkeleton key={idx} />
            ))}
      </div>

      {info && <PaginationButton pageData={info} />}
    </div>
  );
}
