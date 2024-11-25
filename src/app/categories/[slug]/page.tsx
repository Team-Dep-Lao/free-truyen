import api from "@/apis";
import DetailCategory from "./DetailCategory";

export default async function CategoryIndex({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: number }>;
}) {
  const slug = (await params).slug;
  const queryPage = (await searchParams).page;
  const page = queryPage ? (isNaN(queryPage) ? 1 : +queryPage) : 1;

  const res = await api.get(
    `${process.env.NEXT_PUBLIC_MAIN_URL}/the-loai/${slug}`,
    {
      page,
    }
  );

  const categories = await api.get(
    `${process.env.NEXT_PUBLIC_MAIN_URL}/the-loai`
  );

  return (
    <DetailCategory pageData={res.data} categories={categories.data.items} />
  );
}
