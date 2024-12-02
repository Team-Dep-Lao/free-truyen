import axios from "axios";
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
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_MAIN_URL}/the-loai/${slug}?page=${page}`
  );

  try {
    return (
      <DetailCategory info={res.data.data} pageData={res.data.data.items} />
    );
  } catch (e) {
    return null;
  }
}
