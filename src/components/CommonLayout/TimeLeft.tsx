"use client";

import { cn } from "@/lib/utils";
import moment, { now } from "moment";
import { useEffect, useState } from "react";

export interface TimeLeftProps {
  className?: string;
}

export default function TimeLeft(props: TimeLeftProps) {
  const isClient = typeof window === 'object'
  if (!isClient) return <></>

  const [time, setTime] = useState(() => {
    const time = localStorage.getItem("APPLY_CODE");
    if (!time) return 0;
    const timer = moment(time).diff(now(), "hours");
    return timer;
  });

  useEffect(() => {
    let timer;
    timer = setInterval(() => {
      setTime(() => {
        const time = localStorage.getItem("APPLY_CODE");
        if (!time) return 0;
        return moment(time).diff(now(), "hours");
      });
    }, 3600000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-row items-center space-x-1">
      <div className={cn(["text-white font-bold", props.className])}>{`Còn lại: ${time.toLocaleString()} giờ.`}</div>
    </div>
  );
}
