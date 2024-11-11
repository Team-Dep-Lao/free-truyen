"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import * as React from "react";
import { useInView } from "react-intersection-observer";
import ImageSkeleton from "../Skeleton/ImageSkeleton";

export interface ChapterImageCardProps {
  domain: string;
  path: string;
  file: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function ChapterImageCard(props: ChapterImageCardProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
  });

  function ErrorImage() {
    return (
      <div className="size-full flex flex-col justify-center items-center">
        Image loaded error. Please try again.
      </div>
    );
  }

  return (
    <div className="flex flex-row w-full">
      <React.Suspense fallback={<ImageSkeleton/>}>
        {inView && (
          <Image
            alt=""
            src={`${props.domain}/${props.path}/${props.file}`}
            width={0}
            height={0}
            sizes="100vw"
            className={cn(["object-contain w-full h-auto", props.className])}
            style={props.style ?? {}}
            onError={(e) => {
              return <ErrorImage />;
            }}
          />
        )}
      </React.Suspense>
      <div className={"w-[20px] h-[200px]"} ref={ref}></div>
    </div>
  );
}
