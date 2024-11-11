import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import SearchBar from "../SearchBar";
import { cn } from "@/lib/utils";
import SubHeader from "./SubHeader";
import RedeemButton from "./RedeemButton";
import CheckFreeHourUseWeb from "./CheckFreeHourUseWeb";
import MobileMenu from "./MobileMenu";
import TimeLeft from "./TimeLeft";

export default function Header() {
  return (
    <React.Fragment>
      <header className="sm:static fixed top-0 left-0 right-0 z-50">
        <div className="py-2 bg-black">
          <div className="web-container flex items-center justify-between min-[1200px]:px-0 px-4 space-x-36">
            <Link href={"/"} className="font-bold text-white text-2xl">
              Free Truyện
            </Link>
            <div className={cn(["flex-1 md:flex hidden"])}>
              <SearchBar />
            </div>
            <div className="flex items-center space-x-2">
              {/* <TimeLeft/> */}
              <Link
                href={`mailto:kienbq@lotusa.net?subject=Phản hồi về web đọc truyện free - Free Truyện`}
              >
                <Button className="bg-orange-500 hover:bg-orange-400 text-white font-bold sm:flex hidden">
                  Phản Hồi
                </Button>
              </Link>

              {/* <RedeemButton /> */}
              <div className="">
                <MobileMenu />
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="bg-slate-400 border-b py-2 sticky top-0 sm:flex hidden z-50">
        <div className="web-container min-[1200px]:px-0 px-4 flex relative">
          <SubHeader />
        </div>
      </div>
      <div className="sm:hidden flex h-14"></div>
      {/* <CheckFreeHourUseWeb /> */}
    </React.Fragment>
  );
}
