import api from "@/apis";
import DetailComicComponent from "./Detail";
import { Metadata, ResolvingMetadata } from "next";
import { SeoPage } from "@/lib/types";

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = (await params).slug;

  // fetch data
  const res = await api.get(
    `${process.env.NEXT_PUBLIC_MAIN_URL}/truyen-tranh/${slug}`
  );

  const seoData: SeoPage = res.data.seoOnPage;

  return {
    title: seoData.titleHead,
    description: `${seoData.titleHead} Cập nhật nhanh thứ mười và khá đầy đủ tại Free Truyện`,
    keywords: [
      "truyen",
      "truyen tranh",
      "truyen mien phi",
      "free truyen",
      "truyen free",
    ],
    openGraph: {
      title: seoData.titleHead,
      description: `${seoData.titleHead} Cập nhật nhanh thứ mười và khá đầy đủ tại Free Truyện`,
      type: "website",
      url: "https://truyentranh.kiendev.click",
      images: [
        {
          width: 800,
          height: 600,
          url: seoData.seoSchema.image,
        },
      ],
    },
  };
}

export default async function ComicDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const res = await api.get(
    `${process.env.NEXT_PUBLIC_MAIN_URL}/truyen-tranh/${slug}`
  );

  return <DetailComicComponent pageData={res.data} />;
}
