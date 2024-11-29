import PageProvider from "@/components/CommonLayout/Page";
import Link from "next/link";
import * as React from "react";

export default function ContactPage() {
  return (
    <section className="pt-2 pb-10">
      <PageProvider className="">
        <div className="flex flex-col space-y-2 p-4">
          <div className="text-center text-2xl font-bold">Liên hệ</div>
          <div>
            Gửi mail về:{" "}
            <Link
              className="text-blue-500 underline"
              href="mailto:kienbq2429195@gmail.com"
            >
              kienbq2429195@gmail.com
            </Link>
          </div>
          <></>
        </div>
      </PageProvider>
    </section>
  );
}
