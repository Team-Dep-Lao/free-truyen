"use client";

import { PageData } from "@/lib/types";
import { cn } from "@/lib/utils";
import * as React from "react";
import { PaginationBasic } from "../CustomPagination";
import GridCard from "../Card/GridCard";
import { useRouter } from "next/navigation";

export interface SectionLGridProps {
  title?: string;
  pageData?: PageData;
}

export default function SectionGrid({ title, pageData }: SectionLGridProps) {
  const router = useRouter();

  return (
    pageData && (
      <div className="w-full">
        <div
          className={cn([
            "text-xl text-blue-500 underline font-bold",
            title ? "flex" : "hidden",
          ])}
        >
          {title}
        </div>
        <div className="mt-4 grid sm:grid-cols-4 grid-cols-2 sm:gap-2 gap-1 w-full relative">
          {pageData &&
            pageData.items.map((item, idx) => (
              <GridCard data={item} key={idx} className="h-full" />
            ))}
        </div>
        <PaginationBasic
          className="mt-4"
          currentPage={pageData.params.pagination.currentPage}
          totalPage={Math.ceil(
            pageData.params.pagination.totalItems /
              pageData.params.pagination.totalItemsPerPage
          )}
          onNext={() =>
            router.push(`/?page=${pageData.params.pagination.currentPage + 1}`)
          }
          onPrevious={() =>
            router.push(`/?page=${pageData.params.pagination.currentPage - 1}`)
          }
          onClickLinkPage={(page) => router.push(`/?page=${page}`)}
        />
      </div>
    )
  );
}
