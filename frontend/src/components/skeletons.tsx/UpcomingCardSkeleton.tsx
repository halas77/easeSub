const UpcomingCardSkeleton = () => {
  return (
    <div className="flex flex-col justify-center items-start space-y-2 cursor-pointer  px-6 py-12 animate-pulse rounded-3xl">
      <div className="flex justify-between w-full items-end gap-5">
        <div className="h-6 bg-gray-300 rounded w-32"></div>
        <div className="h-8 bg-gray-300 rounded w-20"></div>
      </div>

      <div className="h-4 bg-gray-300 rounded w-full max-w-sm pt-3 mb-4"></div>
      <div className="h-4 bg-gray-300 rounded w-3/4 max-w-sm"></div>

      <div className="text-xs flex justify-center gap-2">
        <div className="h-6 bg-gray-300 rounded w-24"></div>
      </div>
    </div>
  );
};

export default UpcomingCardSkeleton;
