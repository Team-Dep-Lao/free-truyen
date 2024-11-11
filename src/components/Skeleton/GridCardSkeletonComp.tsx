import GridCardSkeleton from "@/components/Skeleton/GridCardSkeleton";

export default function Loading() {
  return (
    <div className="mt-4 grid sm:grid-cols-4 grid-cols-2 sm:gap-2 gap-1 w-full relative">
      {Array.from({ length: 10 }).map((_, i) => (
        <GridCardSkeleton key={i} />
      ))}
    </div>
  );
}
