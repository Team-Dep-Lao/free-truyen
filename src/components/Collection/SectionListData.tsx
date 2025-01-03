import { PageData } from "@/lib/types";
import ListCard from "@/components/Card/ListCard";
import * as React from "react";

export default function SectionListData({ pageData }: { pageData: PageData }) {
  return (
    <React.Fragment>
      {pageData &&
        pageData.items.map((item, idx) => <ListCard key={idx} data={item} />)}
    </React.Fragment>
  );
}