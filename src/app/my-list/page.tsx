"use client";

import React, { useEffect, useState } from "react";
import PageProvider from "@/components/CommonLayout/Page";
import GridCard from "@/components/Card/GridCard";

const MyBookmarksScreen = () => {
  const [bookmarks, setBookmarks] = useState([]);

  return (
    <section className="pt-4 pb-10">
      <PageProvider>
        <div className="p-4">
          <h1 className="text-xl font-bold">My Bookmarks</h1>
          {bookmarks.length > 0 ? (
            <div className="grid md:grid-cols-5 sm:grid-cols-3 grid-cols-1 gap-2 relative mt-4">
              {bookmarks.map((item) => (
                <GridCard data={item} key={item} className="h-full" />
              ))}
            </div>
          ) : (
            <div className="w-full italic mt-6 text-center">
              Bạn chưa lưu truyện nào.
            </div>
          )}
        </div>
      </PageProvider>
    </section>
  );
};

export default MyBookmarksScreen;
