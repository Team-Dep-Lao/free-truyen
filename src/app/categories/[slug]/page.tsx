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

  try {
    return <DetailCategory slug={slug} page={page} />;
  } catch (e) {
    return null;
  }
}
