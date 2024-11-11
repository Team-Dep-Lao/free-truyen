import { Lock } from "lucide-react";
import Link from "next/link";
import * as React from "react";

export default function ExpiredScreen() {
  return (
    <React.Suspense fallback={<></>}>
      <section className="flex justify-center items-center fixed bg-slate-100 z-[99] top-0 left-0 right-0 bottom-0">
        <div className="flex flex-col space-y-4 items-center">
          <Lock className="size-80" />
          <Link href={"/"} className="text-blue-600 underline font-bold">
            Quay lại trang chủ
          </Link>
        </div>
      </section>
    </React.Suspense>
  );
}
