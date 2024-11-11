"use client";

import GridCard from "@/components/Card/GridCard";
import { PaginationBasic } from "@/components/CustomPagination";
import LoadingScreen from "@/components/LoadingScreen";
import { PageData } from "@/lib/types";
import { useRouter } from "next/navigation";
import * as React from "react";

export interface SearchContentProps {
  pageData?: PageData;
  keyword?: string;
}

export default function SearchContent(props: SearchContentProps) {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    setLoading(true);

    if (props.pageData) {
      setLoading(false);
    }
  }, [props.pageData]);

  return (
    <div>
      {!loading ? (
        props.pageData && (
          <div className="pt-4 px-2">
            <div className="font-bold text-lg">Kết quả</div>
            {props.pageData.items.length > 0 ? (
              <div className="grid sm:grid-cols-5 grid-cols-2 gap-2 relative mt-4">
                {props.pageData.items.map((item, idx) => (
                  <div className="col-span-1" key={idx}>
                    <GridCard data={item} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="italic">{`Không tìm thấy mẩu truyện nào có từ khóa "${props.keyword}"`}</div>
            )}
            {props.pageData.items.length > 0 && (
              <PaginationBasic
                currentPage={props.pageData.params.pagination.currentPage}
                totalPage={Math.ceil(
                  props.pageData.params.pagination.totalItems /
                    props.pageData.params.pagination.totalItemsPerPage
                )}
                onClickLinkPage={(page) => router.push(`?page=${page}`)}
                onNext={() =>
                  props.pageData &&
                  router.push(
                    `?page=${props.pageData.params.pagination.currentPage + 1}`
                  )
                }
                onPrevious={() =>
                  props.pageData &&
                  router.push(
                    `?page=${props.pageData.params.pagination.currentPage - 1}`
                  )
                }
              />
            )}
          </div>
        )
      ) : (
        <LoadingScreen />
      )}
    </div>
  );
}
