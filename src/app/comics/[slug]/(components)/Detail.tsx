import api from "@/apis";
import PageProvider from "@/components/CommonLayout/Page";
import {
  Chapter,
  ChapterData,
  ChapterDetail,
  ChapterImage,
  PageData,
} from "@/lib/types";
import Image from "next/image";
import React from "react";
import moment from "moment";
import "moment/locale/vi";
import ServerDisplay from "./ServerDisplay";
import Link from "next/link";

moment.locale("vi");

export interface DetailComicComponentProps {
  pageData?: PageData;
  chooseServer: number;
  listServer: ChapterData[];
  chooseChapter: number;
  chapterInfo?: ChapterDetail;
}

export default function DetailComicComponent(props: DetailComicComponentProps) {
  return (
    <div className="min-h-screen pt-2 pb-6">
      <PageProvider>
        {props.pageData && (
          <React.Fragment>
            <div className="flex sm:flex-row flex-col sm:space-x-4 space-x-0 space-y-4 sm:space-y-0">
              <Image
                src={`${process.env.NEXT_PUBLIC_IMG_URL}/uploads/comics/${props.pageData.item.thumb_url}`}
                className="sm:w-[400px] w-full aspect-square object-contain"
                alt=""
                width={0}
                height={0}
                sizes="100vw"
              />
              <div className="p-2 flex-1">
                <div className="font-bold text-xl">
                  {props.pageData.item.name}
                </div>
                <div className="font-bold text-gray-400">{`Trạng thái: ${props.pageData.item.status}`}</div>
                <div className="font-bold text-blue-400">{`Tác giả: ${props.pageData.item.author}`}</div>
                <div className="font-bold text-green-400">{`Ngày cập nhật: ${moment(
                  props.pageData.item.updatedAt
                ).format("hh:mm DD/MM/YYYY")}`}</div>
                <div className="flex-row flex-wrap mt-2 flex items-center">
                  {props.pageData.item.category.map((cate, idx) => (
                    <Link
                      className="px-1 rounded-lg bg-black m-0.5 w-fit text-white cursor-pointer"
                      key={idx}
                      href={`/categories/${cate.slug}`}
                    >
                      <div className="text-white font-bold">{cate.name}</div>
                    </Link>
                  ))}
                </div>
                <div
                  className="text-gray-400 italic mt-4"
                  dangerouslySetInnerHTML={{
                    __html: props.pageData.item.content,
                  }}
                ></div>
              </div>
            </div>
            {props.listServer.length > 0 ? (
              <ServerDisplay
                servers={props.listServer}
                chooseServer={props.chooseServer}
                chooseChapter={props.chooseChapter}
                chapterInfo={props.chapterInfo}
              />
            ) : (
              <div className="text-gray-400 italic mt-10 px-8">
                Nội dung truyện đang được cập nhật. Hãy quay lại sau nhé...
              </div>
            )}
          </React.Fragment>
        )}
      </PageProvider>
    </div>
  );
}
