"use client";

import * as React from "react";

import {
  ChevronDown,
  Home,
  Layers3,
  Menu,
  MessageCircleMore,
  Minus,
  Plus,
  ScanBarcode,
  Search,
} from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Categories } from "@/lib/types";
import { useRouter } from "next/navigation";
import useNotification from "@/hooks/useNotification";
import { addDays } from "date-fns";
import api from "@/apis";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useAppContext } from "@/context/dataCommonContext";

export default function MobileMenu() {
  const [showList, setShowList] = React.useState(false);
  const router = useRouter();
  const [visible, setVisible] = React.useState(false);
  const { notification } = useNotification();
  const [open, setOpen] = React.useState(false);
  const { categories } = useAppContext();

  const MENU = [
    {
      label: "Trang chủ",
      href: "/",
      icon: <Home />,
      action: () => {},
    },
    {
      label: "Tìm kiếm",
      href: "/search",
      icon: <Search />,
      action: () => {},
    },
    {
      label: "Thể loại",
      href: "",
      icon: <Layers3 />,
      action: () => {
        setShowList(!showList);
      },
    },
    {
      label: "Đổi code",
      href: "",
      icon: <ScanBarcode />,
      action: () => setVisible(true),
    },
    {
      label: "Phản hồi",
      href: "/",
      icon: <MessageCircleMore />,
      action: () => {},
    },
  ];

  function onSubmitCode() {
    const record = localStorage.getItem("APPLY_CODE");

    notification({
      title: "Nhập code",
      description:
        "Bạn đã nhập mã code thành công. Chúc bạn có nhiều giờ trải nghiệm vui vẻ trên Free Truyện.",
      type: "success",
    });
    localStorage.setItem(
      "APPLY_CODE",
      String(addDays(new Date(record as string), 30))
    );
    setVisible(false);
  }

  return (
    <React.Fragment>
      <Sheet open={open} onOpenChange={(open) => setOpen(open)}>
        <SheetTrigger asChild>
          <Button
            className="bg-blue-200 hover:bg-blue-100 text-white font-bold sm:hidden flex"
            size={"icon"}
            variant={"secondary"}
          >
            <Menu className="text-blue-500" />
          </Button>
        </SheetTrigger>
        <SheetContent className="">
          <SheetHeader className="">
            <SheetTitle>Free Truyen</SheetTitle>
            <SheetDescription>
              Trang web xem truyện free không quảng cáo.
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-col items-stretch">
            {MENU.map((menu, idx) => (
              <React.Fragment key={idx}>
                <Button
                  variant={"ghost"}
                  className="justify-start h-14"
                  key={idx}
                  onClick={
                    menu.href !== ""
                      ? () => router.push(menu.href)
                      : menu.action
                  }
                >
                  <div className="flex items-center flex-row space-x-2 flex-nowrap justify-between flex-1">
                    <div className="flex flex-row items-center space-x-2 flex-nowrap">
                      {menu.icon}
                      <div className="uppercase font-semibold">
                        {menu.label}
                      </div>
                    </div>
                    <ChevronDown
                      className={cn([
                        categories.length > 0 && menu.label === "Thể loại"
                          ? "flex"
                          : "hidden",
                      ])}
                    />
                  </div>
                </Button>
                <div
                  className={cn([
                    "grid grid-cols-2 p-4 gap-1 overflow-y-auto max-h-[300px]",
                    menu.label === "Thể loại" && showList
                      ? "visible"
                      : "hidden",
                  ])}
                >
                  {categories.map((cate) => (
                    <Link
                      key={cate._id}
                      href={`/categories/${cate.slug}`}
                      onClick={() => {
                        setOpen(false);
                        setShowList(false);
                      }}
                      className="border px-1 rounded-sm"
                    >
                      {cate.name}
                    </Link>
                  ))}
                </div>
              </React.Fragment>
            ))}
          </div>
        </SheetContent>
      </Sheet>
      <Dialog open={visible} onOpenChange={(open) => setVisible(open)}>
        <DialogContent className="flex flex-col items-stretch">
          <DialogHeader>
            <DialogTitle>Mã đổi</DialogTitle>
            <DialogDescription>
              Nhập mã code để nhận được nhiều phần quà tương ứng.
            </DialogDescription>
          </DialogHeader>
          <Input
            className="col-span-3"
            placeholder="Nhập mã của bạn tại đây."
          />
          <DialogFooter>
            <Button onClick={onSubmitCode} type="button" className="w-full">
              Xác nhận
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}