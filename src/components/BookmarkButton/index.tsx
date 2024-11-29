"use client";

import * as React from "react";
import { Button } from "../ui/button";
import { Bookmark } from "lucide-react";
import { bookmark, checkBookmark, cn } from "@/lib/utils";
import { Item } from "@/lib/types";

export interface BookmarkButtonProps {
  className?: string;
  data: Item;
}

export default function BookmarkButton(props: BookmarkButtonProps) {
  const [isBookmark, setIsBookmark] = React.useState(false);

  React.useEffect(() => {
    const flag = checkBookmark(props.data._id);
    setIsBookmark(flag);
  }, [isBookmark]);

  return (
    <Button
      size={"icon"}
      variant={"outline"}
      className={cn([
        isBookmark ? "fill-black" : "fill-transparent",
        props.className,
      ])}
      onClick={() => {
        bookmark(props.data, isBookmark ? "del" : "update");
        setIsBookmark(!isBookmark);
      }}
    >
      <Bookmark className={cn([])} />
    </Button>
  );
}
