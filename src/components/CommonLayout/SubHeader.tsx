"use client";

import { Bookmark, Home, Logs, Search } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const items = [
  {
    label: "Trang chủ",
    to: "/",
    icon: Home,
  },
  {
    label: "Thể loại",
    to: "/categories",
    icon: Logs,
  },
  {
    label: "Tìm kiếm",
    to: "/search",
    icon: Search,
  },
  {
    label: "Truyện đã lưu",
    to: "/my-list",
    icon: Bookmark,
  },
];

export default function SubHeader() {
  const pathname = usePathname();

  return (
    <div className="flex flex-row items-center h-10 justify-center">
      {items.map((item, idx) => {
        const isActive =
          pathname === item.to || // Đúng chính xác pathname
          (pathname.startsWith(item.to) && pathname !== "/" && item.to !== "/");
        return (
          <div
            key={idx}
            className={cn([
              "mx-2 text-gray-400 font-normal hover:text-blue-500",
              isActive ? "text-blue-600 font-bold" : "",
            ])}
          >
            <Link href={item.to} className={cn(["p-1 "])}>
              <div className={cn(["flex flex-row items-center space-x-1"])}>
                <item.icon size={18} />
                <div>{item.label}</div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
