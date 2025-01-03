import GridCard from "@/components/Card/GridCard";
import * as React from "react";
import GridCardSkeleton from "@/components/Skeleton/GridCardSkeleton";

export default function GridLoading() {
  return <div className="mt-4 grid sm:grid-cols-4 grid-cols-2 sm:gap-2 gap-1 w-full relative">
    {Array.from({ length: 20 }).map((_, idx) => (
      <GridCardSkeleton key={idx} />
    ))}
  </div>;
}