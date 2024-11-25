import api from "@/apis";
import * as React from "react";
import DetailCategory from "./[slug]/DetailCategory";

export default async function CategoryPage() {
  const categories = await api.get(
    `${process.env.NEXT_PUBLIC_MAIN_URL}/the-loai`
  );

  return (
    <>
      <DetailCategory pageData={undefined} categories={categories.data.items} />
    </>
  );
}
