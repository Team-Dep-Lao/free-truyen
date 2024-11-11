import { Card, CardContent, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function GridCardSkeleton() {
  return (
    <Card className="w-full">
      <CardHeader className="p-0">
        <Skeleton className="aspect-square object-cover w-full rounded-md" />
      </CardHeader>
      <CardContent className="p-2">
        <Skeleton className="h-[14px] w-full" />
        <div className="flex flex-row mt-2 items-center flex-wrap">
          {Array.from({ length: 3 }).map((_, idx) => (
            <Skeleton
              key={idx}
              className="rounded-full cursor-pointer px-1.5 m-0.5 w-8 h-[14px]"
            ></Skeleton>
          ))}
        </div>
        <Skeleton className="flex flex-col mt-2 h-[14px] w-8"></Skeleton>
        <Skeleton className="h-[14px] w-6"></Skeleton>
      </CardContent>
    </Card>
  );
}
