"use client";

import GridCard from "@/components/Card/GridCard";
import PaginationButton from "@/components/Collection/PaginationButton";
import GridCardSkeleton from "@/components/Skeleton/GridCardSkeleton";
import useLoading from "@/hooks/useLoading";
import { PageData } from "@/lib/types";
import * as React from "react";

export interface SearchContentProps {
  pageData: PageData | null;
  keyword: string;
}

export default function SearchContent(props: SearchContentProps) {
  const loading = useLoading([props.pageData]);

  return (
    props.keyword !== "" && (
      <div className="pt-4 px-2">
        <div className="font-bold text-lg">Kết quả</div>
        <div className="">Thông tin các truyện có từ khóa{" "}<strong>{props.keyword}</strong></div>
        {!loading ? (
          props.pageData && props.pageData.items.length > 0 ? (
            <div className="grid md:grid-cols-5 sm:grid-cols-3 grid-cols-1 gap-2 relative mt-4">
              {props.pageData.items.map((item, idx) => (
                <GridCard data={item} key={idx} className="h-full" />
              ))}
            </div>
          ) : (
            <div className="italic">{`Không tìm thấy mẩu truyện nào có từ khóa "${props.keyword}"`}</div>
          )
        ) : (
          <div className="grid md:grid-cols-5 sm:grid-cols-3 grid-cols-1 gap-2 relative mt-4">
            {Array.from({ length: 15 }).map((_, idx) => (
              <GridCardSkeleton key={idx} />
            ))}
          </div>
        )}

        {props.pageData && props.pageData.items.length > 0 && (
          <PaginationButton pageData={props.pageData} />
        )}
      </div>
    )
  );
}
