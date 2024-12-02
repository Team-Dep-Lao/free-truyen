"use client";

import { Skeleton } from "@/components/ui/skeleton";
import useLoading from "@/hooks/useLoading";
import { Categories } from "@/lib/types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function ListCategories({
  categories,
}: {
  categories: Categories[];
}) {
  const pathname = usePathname();
  const loading = useLoading([categories])

  return (
    <div className="flex-wrap flex flex-row px-10 justify-center items-center gap-1">
      {!loading
        ? categories.map((category) => (
            <div className="w-fit" key={category._id}>
              <Link
                href={`/categories/${category.slug}`}
                className={cn([
                  "p-1 rounded-sm shadow-sm bg-slate-50 border",
                  pathname.includes(category.slug) ? "bg-green-200" : "",
                ])}
              >
                {category.name}
              </Link>
            </div>
          ))
        : Array.from({ length: 50 }).map((_, idx) => (
            <Skeleton key={idx} className={cn([`h-[27px] w-16`])} />
          ))}
    </div>
  );
}
