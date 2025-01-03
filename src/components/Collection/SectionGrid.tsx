"use client";

import { cn } from "@/lib/utils";
import * as React from "react";
import { PageData } from "@/lib/types";
import PaginationButton from "./PaginationButton";
import GridCardSkeleton from "../Skeleton/GridCardSkeleton";
import dynamic from "next/dynamic";

export interface SectionLGridProps {
  pageData?: PageData;
}

export default function SectionGrid({ pageData }: SectionLGridProps) {
  const DynamicLoading = dynamic<{ pageData: PageData }>(
    () => import("@/components/Collection/SectionGridData"),
    {
      loading: () => (
        <React.Fragment>
          {Array.from({ length: 20 }).map((_, idx) => (
            <GridCardSkeleton key={idx} />
          ))}
        </React.Fragment>
      ),
      ssr: false,
    }
  );
  return (
    <div className="w-full">
      <div className={cn(["text-xl text-blue-500 uppercase font-bold"])}>
        Kho truyện mới miễn phí trọn đời
      </div>
      <div className="mt-4 grid sm:grid-cols-4 grid-cols-2 sm:gap-2 gap-1 w-full relative">
        <DynamicLoading pageData={pageData as any} />
      </div>
      {pageData && <PaginationButton pageData={pageData} />}
    </div>
  );
}
