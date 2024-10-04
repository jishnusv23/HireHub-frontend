import React from "react";

const BlogSkeletonLoader = () => {
  return (
    <div className="bg-background pr-10 pt-24">
      <div className="flex justify-center gap-4">
        {/* <div className="w-24 h-9 bg-gray-200 rounded animate-pulse" /> */}
        <div className="w-24 h-9 bg-gray-200 rounded animate-pulse" />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-6 pl-5">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="p-6 rounded-lg border border-gray-200 bg-backgroundAccent shadow-sm "
          >
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                    <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse" />
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-4/6" />
                </div>
              </div>

              <div className="flex justify-between items-center pt-4">
                <div className="w-20 h-8 bg-gray-200 rounded animate-pulse" />
                <div className="w-24 h-8 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <div className="flex gap-2">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="w-8 h-8 rounded bg-gray-200 animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogSkeletonLoader;
