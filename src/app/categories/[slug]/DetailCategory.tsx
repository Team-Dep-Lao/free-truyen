"use client";

import GridCard from "@/components/Card/GridCard";
import PageProvider from "@/components/CommonLayout/Page";
import { PaginationBasic } from "@/components/CustomPagination";
import { Categories, PageData } from "@/lib/types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export interface DetailCategoryProps {
  pageData: PageData | undefined;
  categories: Categories[];
}

export default function DetailCategory({
  pageData,
  categories = [],
}: DetailCategoryProps) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <section className="min-h-screen pt-2 pb-6">
      <PageProvider>
        <div className="flex flex-col space-y-4">
          <div className="font-bold text-lg">Tất cả các thể loại</div>
          <div className="flex-wrap flex flex-row px-10 justify-center items-center">
            {categories.map((category) => (
              <div className="w-fit m-1" key={category._id}>
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
            ))}
          </div>
        </div>
        {pageData && (
          <div className="px-1 flex-1 mt-4">
            <div
              className={cn(["mt-4 text-lg font-bold"])}
            >{`Danh sách truyện thể loại ${pageData.titlePage}`}</div>
            {pageData && (
              <div className="relative grid sm:grid-cols-5 grid-cols-2 gap-2 mt-4">
                {pageData.items.map((item, idx) => (
                  <GridCard data={item} key={idx} className="h-full" />
                ))}
              </div>
            )}
            <PaginationBasic
              className="mt-4"
              currentPage={pageData.params.pagination.currentPage}
              totalPage={Math.ceil(
                pageData.params.pagination.totalItems /
                  pageData.params.pagination.totalItemsPerPage
              )}
              onClickLinkPage={(page) => router.push(`?page=${page}`)}
              onNext={() =>
                pageData &&
                router.push(
                  `?page=${pageData.params.pagination.currentPage + 1}`
                )
              }
              onPrevious={() =>
                pageData &&
                router.push(
                  `?page=${pageData.params.pagination.currentPage - 1}`
                )
              }
            />
          </div>
        )}
      </PageProvider>
    </section>
  );
}
