"use client";

import api from "@/apis";
import { Skeleton } from "@/components/ui/skeleton";
import { Categories } from "@/lib/types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function ListCategories() {
  const pathname = usePathname();
  const [categories, setCategories] = useState<Categories[]>([]);
  const [loading, setLoading] = useState(true);

  async function getCategories() {
    try {
      setLoading(true);
      const res = await api.get(`${process.env.NEXT_PUBLIC_MAIN_URL}/the-loai`);

      setCategories(res.data.items);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

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
