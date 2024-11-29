import PageProvider from "@/components/CommonLayout/Page";
import Link from "next/link";
import * as React from "react";

export default function IntroPage() {
  return (
    <section className="pt-2 pb-10">
      <PageProvider className="">
        <div className="flex flex-col space-y-2 p-4">
          <div className="text-center text-2xl font-bold">
            Giới thiệu về trang web
          </div>
          <div>
            Trang web này được code bởi <strong>TeamZepLao</strong> dựa trên open source API của OT
            Truyện.
          </div>
          <div>
            Trang hoàn toàn free và được xây dựng các tính năng nhằm mục đích
            học tập, rèn luyện kỹ năng.
          </div>
          <div>
            Các công nghệ sử dụng trên web: NextJS, Typescript, Shadcn UI,
            TailwindCSS.
          </div>
          <div>
            Link tài liệu API:{" "}
            <Link
              className="text-blue-500 underline"
              href="https://docs.otruyenapi.com/"
            >
              https://docs.otruyenapi.com/
            </Link>
          </div>
          <div className="">Để góp ý, hoặc cần hỗ trợ hãy liên hệ với chúng tôi qua <Link href="/contact" className="underline text-blue-500">đây</Link></div>
        </div>
      </PageProvider>
    </section>
  );
}
