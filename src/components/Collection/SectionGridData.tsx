import GridCard from "@/components/Card/GridCard";
import * as React from "react";
import { PageData } from "@/lib/types";

export default function SectionGridData({ pageData }: { pageData: PageData }) {
  return (
    pageData.items.map((item, idx) => (
      <GridCard data={item} key={idx} className="h-full" />))
  );
}