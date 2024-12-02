"use client";

import { cn } from "@/lib/utils";
import * as React from "react";
import { PageData } from "@/lib/types";
import GridCard from "../Card/GridCard";
import PaginationButton from "./PaginationButton";
import GridCardSkeleton from "../Skeleton/GridCardSkeleton";
import useLoading from "@/hooks/useLoading";

export interface SectionLGridProps {
  page: number;
  pageData: PageData | null;
}

export default function SectionGrid({ page, pageData }: SectionLGridProps) {
  const loading = useLoading([page, pageData]);

  return (
    <div className="w-full">
      <div className={cn(["text-xl text-blue-500 uppercase font-bold"])}>
        Kho truyện mới miễn phí trọn đời
      </div>
      <div className="mt-4 grid sm:grid-cols-4 grid-cols-2 sm:gap-2 gap-1 w-full relative">
        {!loading
          ? pageData &&
            pageData.items.map((item, idx) => (
              <GridCard data={item} key={idx} className="h-full" />
            ))
          : Array.from({ length: 20 }).map((_, idx) => (
              <GridCardSkeleton key={idx} />
            ))}
      </div>
      {pageData && <PaginationButton pageData={pageData} />}
    </div>
  );
}
