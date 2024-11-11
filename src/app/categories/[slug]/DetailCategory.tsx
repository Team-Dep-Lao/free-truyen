"use client";

import api from "@/apis";
import GridCard from "@/components/Card/GridCard";
import PageProvider from "@/components/CommonLayout/Page";
import { PaginationBasic } from "@/components/CustomPagination";
import GridCardSkeleton from "@/components/Skeleton/GridCardSkeleton";
import { PageData } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export interface DetailCategoryProps {
  pageData: PageData | undefined;
}

export default function DetailCategory(props: DetailCategoryProps) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);

    if (props.pageData) {
      setLoading(false);
    }
  }, [props.pageData]);

  return (
    props.pageData && (
      <section className="min-h-screen pt-2 pb-6">
        <PageProvider>
          {!loading
            ? props.pageData && (
                <div className="px-1 flex-1 mt-4">
                  <div
                    className={cn(["mt-4 text-lg font-bold"])}
                  >{`Danh sách truyện thể loại ${props.pageData.titlePage}`}</div>
                  {props.pageData && (
                    <div className="relative grid sm:grid-cols-5 grid-cols-2 gap-2 mt-4">
                      {props.pageData.items.map((item, idx) => (
                        <GridCard data={item} key={idx} className="h-full" />
                      ))}
                    </div>
                  )}
                  <PaginationBasic
                    className="mt-4"
                    currentPage={props.pageData.params.pagination.currentPage}
                    totalPage={Math.ceil(
                      props.pageData.params.pagination.totalItems /
                        props.pageData.params.pagination.totalItemsPerPage
                    )}
                    onClickLinkPage={(page) => router.push(`?page=${page}`)}
                    onNext={() =>
                      props.pageData &&
                      router.push(
                        `?page=${
                          props.pageData.params.pagination.currentPage + 1
                        }`
                      )
                    }
                    onPrevious={() =>
                      props.pageData &&
                      router.push(
                        `?page=${
                          props.pageData.params.pagination.currentPage - 1
                        }`
                      )
                    }
                  />
                </div>
              )
            : Array.from({ length: 20 }).map((_, _i) => (
                <GridCardSkeleton key={_i} />
              ))}
        </PageProvider>
      </section>
    )
  );
}
