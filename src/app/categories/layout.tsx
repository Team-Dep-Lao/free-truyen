import * as React from "react";
import PageProvider from "@/components/CommonLayout/Page";
import ListCategories from "./[slug]/ListCategories";

export default async function CategoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen pt-2 pb-6">
      <PageProvider>
        <div className="flex flex-col space-y-4">
          <div className="font-bold text-lg">Tất cả các thể loại</div>
          <ListCategories />
        </div>
        {children}
      </PageProvider>
    </section>
  );
}
