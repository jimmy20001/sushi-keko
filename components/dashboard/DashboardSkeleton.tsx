
import React from 'react';

const SkeletonElement: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`bg-slate-700/50 rounded-lg animate-pulse ${className}`} />
);

const DashboardSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Greeting Skeleton */}
      <div className="mb-6">
        <SkeletonElement className="h-9 w-3/4" />
      </div>

      {/* Points Balance Card Skeleton */}
      <div className="mb-8 p-6 bg-slate-800/50 border border-slate-700 rounded-2xl">
        <div className="flex justify-between items-center">
          <div>
            <SkeletonElement className="h-6 w-32 mb-2" />
            <SkeletonElement className="h-14 w-48" />
          </div>
          <SkeletonElement className="h-28 w-28 rounded-full" />
        </div>
      </div>

      {/* For You Section Skeleton */}
      <div>
        <SkeletonElement className="h-8 w-40 mb-4" />
        <div className="flex space-x-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex-shrink-0 w-72 h-40 p-4 bg-slate-800/50 border border-slate-700 rounded-2xl">
              <SkeletonElement className="h-5 w-3/4 mb-4" />
              <SkeletonElement className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
