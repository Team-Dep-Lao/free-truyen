import api from "@/apis";
import SectionCarousel from "@/components/Collection/SectionCarousel";
import SectionGrid from "@/components/Collection/SectionGrid";
import SectionList from "@/components/Collection/SectionList";
import PageProvider from "@/components/CommonLayout/Page";
import Loading from "@/components/Skeleton/GridCardSkeletonComp";
import React from "react";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: number }>;
}) {
  const queryPage = (await searchParams).page;

  const page = queryPage ? (isNaN(queryPage) ? 1 : +queryPage) : 1;

  const newComics = await api.get(
    `${process.env.NEXT_PUBLIC_MAIN_URL}/danh-sach/truyen-moi`,
    { page: 1 }
  );
  const comingSoonComics = await api.get(
    `${process.env.NEXT_PUBLIC_MAIN_URL}/danh-sach/sap-ra-mat`,
    { page: 1 }
  );

  const releaseNowComics = await api.get(
    `${process.env.NEXT_PUBLIC_MAIN_URL}/danh-sach/dang-phat-hanh`,
    { page }
  );

  return (
    <section className="pb-10 pt-2">
      <PageProvider>
        <SectionCarousel
          pageData={newComics.data}
          title="Free Truyện - Danh sách truyện mới"
        />
        <div className="sm:grid flex flex-col sm:space-y-0 space-y-4 sm:grid-cols-12 mt-10 sm:gap-4">
          <div className="sm:col-span-7 col-span-1">
            <React.Suspense fallback={<Loading />}>
              <SectionGrid
                title="Kho truyện miễn phí trọn đời"
                pageData={releaseNowComics.data}
              />
            </React.Suspense>
          </div>
          <div className="sm:col-span-5">
            <SectionList title="Sắp ra mắt" pageData={comingSoonComics.data} />
          </div>
        </div>
      </PageProvider>
    </section>
  );
}
