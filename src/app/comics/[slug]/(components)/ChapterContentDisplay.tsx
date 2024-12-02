"use client";

import ChapterImageCard from "@/components/Card/ChapterImageCard";
import { ChapterDetail } from "@/lib/types";
import React from "react";

export default function ChapterContentDisplay({
  data,
  domain,
  path,
}: {
  data: ChapterDetail;
  domain: string;
  path: string;
}) {
  return (
    <React.Suspense fallback={<>Loading...</>}>
      {data.item.chapter_image.map((data, index_data) => (
        <ChapterImageCard
          domain={domain}
          path={path}
          file={data.image_file}
          key={index_data}
        />
      ))}
    </React.Suspense>
  );
}
