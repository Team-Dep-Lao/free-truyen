"use client";

import { PageData } from "@/lib/types";
import { useRouter } from "next/navigation";
import { PaginationBasic } from "../CustomPagination";

export default function PaginationButton({ pageData }: { pageData: PageData }) {
  const router = useRouter();

  return (
    <PaginationBasic
      className="mt-4"
      currentPage={pageData.params.pagination.currentPage}
      totalPage={Math.ceil(
        pageData.params.pagination.totalItems /
          pageData.params.pagination.totalItemsPerPage
      )}
      onNext={() =>
        router.push(`?page=${pageData.params.pagination.currentPage + 1}`)
      }
      onPrevious={() =>
        router.push(`?page=${pageData.params.pagination.currentPage - 1}`)
      }
      onClickLinkPage={(page) => router.push(`?page=${page}`)}
    />
  );
}
