"use client";

import api from "@/apis";
import GridCard from "@/components/Card/GridCard";
import PaginationButton from "@/components/Collection/PaginationButton";
import GridCardSkeleton from "@/components/Skeleton/GridCardSkeleton";
import { PageData } from "@/lib/types";
import * as React from "react";

export interface SearchContentProps {
  page: number;
  keyword?: string;
}

export default function SearchContent(props: SearchContentProps) {
  const [loading, setLoading] = React.useState(true);
  const [pageData, setPageData] = React.useState<PageData | null>(null);

  async function onGet() {
    setLoading(true);
    try {
      const res = await api.get(
        `${process.env.NEXT_PUBLIC_MAIN_URL}/tim-kiem?keyword=${props.keyword}&page=${props.page}`
      );

      setPageData(res.data);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    onGet();
  }, [props.page]);

  return (
    <div className="pt-4 px-2">
      <div className="font-bold text-lg">Kết quả</div>
      <div className="grid sm:grid-cols-5 grid-cols-2 gap-2 relative mt-4">
        {!loading ? (
          pageData && pageData.items.length > 0 ? (
            pageData.items.map((item, idx) => (
              <div className="col-span-1" key={idx}>
                <GridCard data={item} />
              </div>
            ))
          ) : (
            <div className="italic">{`Không tìm thấy mẩu truyện nào có từ khóa "${props.keyword}"`}</div>
          )
        ) : (
          <>
            {Array.from({ length: 20 }).map((_, idx) => (
              <GridCardSkeleton key={idx} />
            ))}
          </>
        )}
      </div>
      {pageData && <PaginationButton pageData={pageData} />}
    </div>
  );
}
