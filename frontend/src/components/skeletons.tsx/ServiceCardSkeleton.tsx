const ServiceCardSkeleton = () => {
  return (
    <div className="bg-white border border-solid border-gray-200 rounded-2xl p-4 animate-pulse">
      {/* Price Skeleton */}
      <div className="h-6 bg-gray-200 rounded w-16 mb-1 self-end"></div>

      {/* Title Skeleton */}
      <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>

      {/* Description Skeleton */}
      <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
      <div className="h-3 bg-gray-200 rounded w-5/6 mb-1"></div>
      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
    </div>
  );
};

export default ServiceCardSkeleton;
