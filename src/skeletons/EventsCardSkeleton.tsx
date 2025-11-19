const EventCardSkeleton = () => {
  return (
    <div className="h-[200px] w-[200px] rounded-lg overflow-hidden flex-shrink-0 bg-bg2 animate-pulse">
      <div className="w-full h-full relative">
        <div className="w-full h-full bg-bg4"></div>
        <div className="absolute bottom-0 left-0 w-full p-3 space-y-2 bg-black/40 backdrop-blur-sm">
          <div className="h-3 bg-bg4 rounded w-3/4"></div>
          <div className="h-2 bg-bg4 rounded w-1/2"></div>
          <div className="h-2 bg-bg4 rounded w-1/3"></div>
          <div className="h-2 bg-bg4 rounded w-1/4"></div>
        </div>
      </div>
    </div>
  );
};

export default EventCardSkeleton;
