"use client";

import { PageData } from "@/lib/types";
import * as React from "react";

import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";

export interface SectionListProps {
  title?: string;
  pageData: PageData | undefined;
}

const DataList = dynamic<{ pageData: PageData }>(() => import("@/components/Collection/SectionListData"), {
  loading: () => (
    <React.Fragment>
      <div className="flex justify-center text-black">Loading...</div>
    </React.Fragment>
  )
});

export default function SectionList({ title, pageData }: SectionListProps) {
  return (
    <div className="">
      <div
        className={cn([
          "text-xl text-blue-500 font-bold uppercase",
          title ? "flex" : "hidden"
        ])}
      >
        {title}
      </div>
      <div className="flex flex-col items-stretch space-y-3 mt-4 h-screen overflow-y-auto">
        <DataList pageData={pageData as any} />
      </div>
    </div>
  );
}
