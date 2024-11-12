import { ChapterData, ChapterDetail } from "@/lib/types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import ChapterContentDisplay from "./ChapterContentDisplay";
import { Button } from "@/components/ui/button";
import { ArrowRightToLine } from "lucide-react";

export interface ServerDisplayProps {
  servers: ChapterData[];
  chooseServer: number;
  chooseChapter: number;
  chapterInfo?: ChapterDetail;
}

export default function ServerDisplay(props: ServerDisplayProps) {
  const chapterList =
    (props.servers.length > 0 &&
      props.servers[props.chooseServer ?? 0].server_data) ||
    [];

  return (
    <div className="mt-4 flex-1 px-2">
      <div className="text-lg font-bold">Chọn Server</div>
      <div className="flex-row flex-wrap mb-4 flex">
        {props.servers.length > 0 &&
          props.servers.map((server, idx) => (
            <Link
              href={`?_sv=${idx}&_stt=0`}
              className={cn([
                "border rounded-lg px-1 m-0.5",
                idx === props.chooseServer ? "bg-blue-300" : "bg-slate-100",
              ])}
              key={idx}
            >
              <div className="text-black">{server.server_name}</div>
            </Link>
          ))}
      </div>
      <div className="font-bold">Chapters</div>
      <div className="flex-row flex-wrap mb-4 mt-1 flex max-h-[300px] overflow-y-auto">
        {chapterList.map((chapter, idx) => (
          <Link
            key={idx}
            href={`?_sv=${props.chooseServer}&_stt=${idx}`}
            className={cn([
              "border rounded-lg m-0.5 min-w-10 p-0.5 justify-center flex cursor-pointer items-center",
              idx === props.chooseChapter ? "bg-green-300" : "bg-slate-100",
            ])}
          >
            <div>{chapter.chapter_name}</div>
          </Link>
        ))}
      </div>
      {props.chapterInfo && (
        <div className="flex-1 items-center mt-10 flex flex-col">
          <div className="text-xl font-bold">{`Chapter ${props.chapterInfo.item.chapter_name}`}</div>
          <div className="text-lg font-bold">
            {props.chapterInfo.item.chapter_title}
          </div>

          <div className="mt-4 mb-10 w-full" id="content">
            <ChapterContentDisplay
              data={props.chapterInfo}
              domain={props.chapterInfo.domain_cdn}
              path={props.chapterInfo.item.chapter_path}
            />
            <div className="flex items-center space-x-4 w-full justify-center mt-4">
              <Button
                disabled={props.chooseChapter === 0}
                className="select-none"
              >
                <Link
                  href={`?_sv=${props.chooseServer}&_stt=${
                    props.chooseChapter - 1
                  }#content`}
                  className="flex flex-row items-center space-x-2"
                >
                  <ArrowRightToLine className="rotate-180 text-white" />
                  <div>Chapter Trước</div>
                </Link>
              </Button>
              <Button
                disabled={props.chooseChapter === chapterList.length - 1}
                className="select-none"
              >
                <Link
                  href={`?_sv=${props.chooseServer}&_stt=${
                    props.chooseChapter + 1
                  }#content`}
                  className="flex flex-row items-center space-x-2"
                >
                  <div>Chapter Tiếp Theo</div>
                  <ArrowRightToLine className="text-white" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
