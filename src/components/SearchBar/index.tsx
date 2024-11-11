"use client";

import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import React, { FormEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createQuery } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

export default function SearchBar() {
  const [keyword, setKeyword] = useState("");
  const _q = useSearchParams().get("_q");
  const router = useRouter();
  // const pathname

  function onSubmit(e: FormEvent) {
    e.preventDefault();

    if (keyword.trim() !== "") {
      router.push(
        `/search?${createQuery({
          _q: keyword,
        })}`
      );
    } else {
      router.push("/search");
    }
  }

  useEffect(() => {
    if (_q) {
      setKeyword(_q);
    } else {
      setKeyword("");
    }
  }, [_q]);

  return (
    <React.Suspense fallback={<Skeleton className="h-10 w-[730px]" />}>
      <form
        onSubmit={onSubmit}
        className="flex items-center space-x-2 flex-nowrap flex-1"
      >
        <Input
          placeholder="Tìm kiếm..."
          className=""
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Button
          size={"icon"}
          type="submit"
          variant={"secondary"}
          className="size-10  "
        >
          <Search />
        </Button>
      </form>
    </React.Suspense>
  );
}
