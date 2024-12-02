"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";

export default function SearchBar({
  paramsKeyword,
}: {
  paramsKeyword: string;
}) {
  const router = useRouter();
  const [keyword, setKeyword] = React.useState(paramsKeyword);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push(`?_q=${keyword}&page=1`);
  }

  React.useEffect(() => {
    setKeyword(paramsKeyword)
  }, [paramsKeyword])  

  return (
    <form
      onSubmit={onSubmit}
      className="flex-row items-center w-full px-2 flex"
    >
      <Input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="w-full h-10 p-2 placeholder:text-gray-400 rounded-lg"
        placeholder="Nhập từ khóa..."
      />
      <Button
        size={"icon"}
        type="submit"
        className="ml-4 bg-blue-500 p-2 rounded-xl shadow-md"
        disabled={keyword.trim() === ''}
      >
        <Search size={24} type="submit" className="text-white" />
      </Button>
    </form>
  );
}
