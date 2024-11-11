'use client';

import { ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function ScrollButton() {
  const [visible, setVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Cuộn mượt mà
    });
  };

  useEffect(() => {
    function toggleVisibility() {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    }

    toggleVisibility();
    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <Button className={cn(["fixed bottom-8 right-8", visible ? "flex" : "hidden"])} size={'icon'} variant={'outline'} onClick={scrollToTop}>
      <ChevronDown className="rotate-180" />
    </Button>
  );
}