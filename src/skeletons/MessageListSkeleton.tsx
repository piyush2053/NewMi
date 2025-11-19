import React from "react";

const MessagesListSkeleton = () => {
  return (
    <div className="animate-pulse space-y-3">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="flex items-center gap-3 p-3 bg-bg4 rounded-lg"
        >
          {/* Avatar circle */}
          <div className="w-12 h-12 rounded-full bg-bg3"></div>

          {/* Text lines */}
          <div className="flex-1 space-y-2">
            <div className="h-3 w-32 bg-bg3 rounded"></div>
            <div className="h-3 w-48 bg-bg3 rounded"></div>
          </div>

          {/* Admin Badge Placeholder */}
          <div className="w-10 h-4 bg-bg3 rounded-full"></div>
        </div>
      ))}
    </div>
  );
};

export default MessagesListSkeleton;
