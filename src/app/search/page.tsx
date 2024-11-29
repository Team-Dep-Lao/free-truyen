import api from "@/apis";
import PageProvider from "@/components/CommonLayout/Page";
import * as React from "react";
import SearchContent from "./SearchContent";
import SearchBar from "./SearchBar";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: number; _q?: string }>;
}) {
  const _q = (await searchParams)._q ?? "";
  const queryPage = (await searchParams).page;
  const page = queryPage ? (isNaN(queryPage) ? 1 : +queryPage) : 1;

  return (
    <section className="min-h-screen pt-2 pb-6">
      <PageProvider>
        <div className="flex-1 mt-4 px-1 items-center">
          <SearchBar paramsKeyword={_q ?? ""} />
          <div className="">
            <SearchContent page={page} keyword={_q} />
          </div>
        </div>
      </PageProvider>
    </section>
  );
}
