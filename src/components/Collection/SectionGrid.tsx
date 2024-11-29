"use client";

import { cn } from "@/lib/utils";
import * as React from "react";
import api from "@/apis";
import { PageData } from "@/lib/types";
import GridCard from "../Card/GridCard";
import PaginationButton from "./PaginationButton";
import GridCardSkeleton from "../Skeleton/GridCardSkeleton";

export interface SectionLGridProps {
  page: number;
}

export default function SectionGrid({ page }: SectionLGridProps) {
  const [loading, setLoading] = React.useState(true);
  const [pageData, setPageData] = React.useState<PageData | null>(null);

  async function getPageData() {
    setLoading(true);
    await api
      .get(`${process.env.NEXT_PUBLIC_MAIN_URL}/danh-sach/dang-phat-hanh`, {
        page,
      })
      .then((res) => {
        setPageData(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  React.useEffect(() => {
    getPageData();
  }, [page]);

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
