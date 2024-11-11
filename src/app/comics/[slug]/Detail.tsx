"use client";

import api from "@/apis";
import PageProvider from "@/components/CommonLayout/Page";
import { Chapter, ChapterDetail, PageData } from "@/lib/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { cn } from "@/lib/utils";
import ChapterImageCard from "@/components/Card/ChapterImageCard";
import useWindowSize from "@/hooks/useWindowSize";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import "moment/locale/vi";

moment.locale("vi");

export interface DetailComicComponentProps {
  pageData: PageData | undefined;
}

export interface DetailComicState {
  serverIdx: number;
  chapters: Chapter[];
  currentChapterIdx: number;
}

export default function DetailComicComponent({
  pageData,
}: DetailComicComponentProps) {
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState<DetailComicState>({
    serverIdx: 0,
    chapters: [],
    currentChapterIdx: 0,
  });
  const [chapterInfo, setChapterInfo] = useState({
    name: "",
    title: "",
    apiData: "",
  });
  const [oneChapterInfo, setOneChapterInfo] = useState<
    ChapterDetail | undefined
  >(undefined);
  const router = useRouter();
  const windowSize = useWindowSize();
  async function onGetChapterData() {
    try {
      const res = await api.get(`${chapterInfo.apiData}`);

      setOneChapterInfo(res.data);
    } catch (e) {
      console.log(e);
    } finally {
    }
  }

  useEffect(() => {
    if (!pageData) return;
    if (pageData.item.chapters.length < 1) return;

    const chapters = [...pageData.item.chapters[detail.serverIdx].server_data];
    setDetail((prev) => ({ ...prev, chapters }));
  }, [detail.serverIdx, pageData]);

  useEffect(() => {
    if (chapterInfo.apiData === "") return;
    onGetChapterData();
  }, [pageData, chapterInfo.apiData]);

  useEffect(() => {
    if (pageData) {
      setLoading(false);
    }
  }, [pageData]);

  useEffect(() => {
    if (!pageData) return;
    if (pageData.item.chapters.length < 1) return;

    const data =
      pageData.item.chapters[detail.serverIdx].server_data[
        detail.currentChapterIdx
      ];

    setChapterInfo((prev) => ({
      ...prev,
      name: data.chapter_name,
      title: data.chapter_title,
      apiData: data.chapter_api_data,
    }));
  }, [detail.currentChapterIdx, pageData]);

  return (
    <div className="min-h-screen pt-2 pb-6">
      <PageProvider>
        {pageData && (
          <React.Fragment>
            <div className="flex flex-row space-x-4">
              <Image
                src={`${process.env.NEXT_PUBLIC_IMG_URL}/uploads/comics/${pageData.item.thumb_url}`}
                className="sm:size-[400px] object-contain"
                alt=""
                width={0}
                height={0}
                sizes="100vw"
              />
              <div className="p-2 flex-1">
                <div className="font-bold text-xl">{pageData.item.name}</div>
                <div className="font-bold text-gray-400">{`Trạng thái: ${pageData.item.status}`}</div>
                <div className="font-bold text-blue-400">{`Tác giả: ${pageData.item.author}`}</div>
                <div className="font-bold text-green-400">{`Ngày cập nhật: ${moment(
                  pageData.item.updatedAt
                ).format("hh:mm DD/MM/YYYY")}`}</div>
                <div className="flex-row flex-wrap mt-2 flex items-center">
                  {pageData.item.category.map((cate, idx) => (
                    <div
                      className="px-1 rounded-lg bg-black m-0.5 w-fit text-white cursor-pointer"
                      key={idx}
                      onClick={() => router.push(`/category/${cate.slug}`)}
                    >
                      <div className="text-white font-bold">{cate.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-4 flex-1 px-2">
              <div className="text-lg font-bold">Chọn Server</div>
              <div className="flex-row flex-wrap mb-4 flex">
                {pageData.item.chapters.length > 0 &&
                  pageData.item.chapters.map((chapter, idx) => (
                    <div
                      className={cn([
                        "border rounded-lg px-1 m-0.5",
                        idx === detail.serverIdx
                          ? "bg-blue-300"
                          : "bg-slate-100",
                      ])}
                      key={idx}
                      onClick={() =>
                        setDetail((prev) => ({ ...prev, serverIdx: idx }))
                      }
                    >
                      <div className="text-black">{chapter.server_name}</div>
                    </div>
                  ))}
              </div>
              <div className="font-bold">Chapters</div>
              <div className="flex-row flex-wrap mb-4 mt-1 flex">
                {detail.chapters.length > 0 &&
                  detail.chapters.map((chapter, idx) => (
                    <div
                      key={idx}
                      className={cn([
                        "border rounded-lg m-0.5 min-w-10 p-0.5 justify-center flex cursor-pointer items-center",
                        idx === detail.currentChapterIdx
                          ? "bg-green-300"
                          : "bg-slate-100",
                      ])}
                      onClick={() => {
                        setDetail((prev) => ({
                          ...prev,
                          currentChapterIdx: idx,
                        }));
                      }}
                    >
                      <div>{chapter.chapter_name}</div>
                    </div>
                  ))}
              </div>
              {oneChapterInfo && (
                <div className="flex-1 items-center mt-10 flex flex-col">
                  <div className="text-xl font-bold">{`Chapter ${oneChapterInfo.item.chapter_name}`}</div>
                  <div className="text-lg font-bold">
                    {oneChapterInfo.item.chapter_title}
                  </div>

                  <div className="mt-4 mb-10 w-full">
                    <Carousel
                      style={{ maxHeight: windowSize?.height }}
                      className=""
                    >
                      <CarouselContent className="w-auto">
                        {oneChapterInfo.item.chapter_image.map(
                          (data, index_data) => (
                            <CarouselItem
                              key={index_data}
                              className="sm:basis-2/3"
                            >
                              <div className="flex justify-center items-center p-1">
                                <ChapterImageCard
                                  domain={oneChapterInfo.domain_cdn}
                                  path={oneChapterInfo.item.chapter_path}
                                  file={data.image_file}
                                  style={{
                                    maxHeight:
                                      (windowSize && windowSize.height - 100) ??
                                      500,
                                  }}
                                />
                              </div>
                            </CarouselItem>
                          )
                        )}
                      </CarouselContent>
                      <CarouselPrevious className="left-0" />
                      <CarouselNext className="right-0" />
                    </Carousel>
                  </div>
                </div>
              )}
            </div>
          </React.Fragment>
        )}
      </PageProvider>
    </div>
  );
}
