import TableSkeleton from "@/Components/utils/LoadingSkeleton";

export default function Loading() {
  return (
    <div className="flex justify-center w-full">
      <TableSkeleton />
    </div>
  );
}
