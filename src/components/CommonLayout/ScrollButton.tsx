"use client";

import { ChevronDown, MessageCircleMore, Phone } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { cn, createQuery } from "@/lib/utils";
import Link from "next/link";

export default function ScrollButton() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Cuộn mượt mà
    });
  };

  useEffect(() => {
    function toggleVisibility() {
      if (window.scrollY > 300) {
        setVisible(true);
        setOpen(true);
      } else {
        setVisible(false);
      }
    }

    toggleVisibility();
    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div
      className={cn([
        "flex flex-col space-y-4 fixed bottom-6 right-6 p-0.5 shadow-sm",
      ])}
    >
      <Link href={"tel:+84877296195"}>
        <Button className="bg-green-500 hover:bg-green-400" size={"icon"}>
          <Phone className="text-white font-bold" />
        </Button>
      </Link>
      <Link
        href={`sms:+84877296195?${createQuery({
          body: "Hỏi điều cần hỏi...?",
        })}`}
      >
        <Button className="bg-blue-500 hover:bg-blue-400" size={"icon"}>
          <MessageCircleMore className="text-white font-bold" />
        </Button>
      </Link>
      <Button
        className={cn(["", visible ? "flex" : "hidden"])}
        size={"icon"}
        variant={"outline"}
        onClick={scrollToTop}
      >
        <ChevronDown className="rotate-180" />
      </Button>
    </div>
  );
}
