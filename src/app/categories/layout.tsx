import * as React from "react";
import PageProvider from "@/components/CommonLayout/Page";
import ListCategories from "./[slug]/ListCategories";
import api from "@/apis";

export default async function CategoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await api.get(
    `${process.env.NEXT_PUBLIC_MAIN_URL}/the-loai`
  );

  return (
    <section className="min-h-screen pt-2 pb-6">
      <PageProvider>
        <div className="flex flex-col space-y-4">
          <div className="font-bold text-lg">Tất cả các thể loại</div>
          <ListCategories categories={categories.data.items} />
        </div>
        {children}
      </PageProvider>
    </section>
  );
}
