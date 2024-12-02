import api from "@/apis";
import DetailComicComponent from "./(components)/Detail";
import { Metadata, ResolvingMetadata } from "next";
import { SeoPage } from "@/lib/types";
import { Suspense } from "react";
import LoadingScreen from "@/components/LoadingScreen";

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
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ _stt?: number; _sv?: number }>;
}) {
  const slug = (await params).slug;
  const searchParamsQuery = await searchParams;
  const queryStt = searchParamsQuery._stt
    ? isNaN(searchParamsQuery._stt)
      ? 0
      : +searchParamsQuery._stt < 0
      ? 0
      : +searchParamsQuery._stt
    : 0;
  const querySv = searchParamsQuery._sv
    ? isNaN(searchParamsQuery._sv)
      ? 0
      : +searchParamsQuery._sv < 0
      ? 0
      : +searchParamsQuery._sv
    : 0;

  const res = await api.get(
    `${process.env.NEXT_PUBLIC_MAIN_URL}/truyen-tranh/${slug}`
  );

  const listServer = res.data.item.chapters;
  const chooseServer = listServer.length > 0 && listServer[querySv];
  const chooseChapter =
    chooseServer &&
    chooseServer.server_data.length > 0 &&
    chooseServer.server_data[queryStt];
  const chapterInfo =
    chooseChapter && (await api.get(`${chooseChapter.chapter_api_data}`));

  return (
    <DetailComicComponent
      pageData={res.data}
      listServer={listServer}
      chooseChapter={queryStt}
      chooseServer={querySv}
      chapterInfo={chapterInfo.data}
    />
  );
}
