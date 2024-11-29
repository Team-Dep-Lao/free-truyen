import { Loader } from "lucide-react";
import React from "react";

function Loading() {
  return <div className="w-full h-[200px] flex flex-col items-center justify-center">
    <Loader className="animate-spin"/>
  </div>;
}

export default Loading;
