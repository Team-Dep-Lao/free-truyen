import { PageData } from "@/lib/types";
import * as React from "react";

import { cn } from "@/lib/utils";
import ListCard from "../Card/ListCard";

export interface SectionListProps {
  title?: string;
  pageData: PageData | undefined;
}

export default function SectionList({ title, pageData }: SectionListProps) {
  return (
    <div className="">
      <div
        className={cn([
          "text-xl text-blue-500 font-bold uppercase",
          title ? "flex" : "hidden",
        ])}
      >
        {title}
      </div>
      <div className="flex flex-col items-stretch space-y-3 mt-4 h-screen overflow-y-auto">
        {pageData &&
          pageData.items.map((item, idx) => <ListCard key={idx} data={item} />)}
      </div>
    </div>
  );
}
