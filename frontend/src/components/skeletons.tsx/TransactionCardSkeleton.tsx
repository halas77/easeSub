const TransactionCardSkeleton = () => {
  return (
    <div className="flex items-center gap-4 py-3 px-2 bg-white rounded duration-200 w-full animate-pulse">
      <div className="flex justify-between gap-4 w-full">
        {/* Icon Skeleton */}
        <div className="w-12 h-12 flex justify-center items-center rounded-full bg-gray-200"></div>

        {/* Text Skeleton */}
        <div className="flex-1">
          <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-16"></div>
        </div>
      </div>

      {/* Amount Skeleton */}
      <div className="h-4 bg-gray-200 rounded w-12"></div>
    </div>
  );
};

export default TransactionCardSkeleton;
