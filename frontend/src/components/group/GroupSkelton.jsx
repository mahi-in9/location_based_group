const GroupSkeleton = () => {
  return (
    <div
      className="animate-pulse bg-zinc-900 rounded-2xl overflow-hidden
border border-zinc-800"
    >
      <div className="h-48 bg-zinc-800"></div>
      <div className="p-5 space-y-4">
        <div className="h-5 bg-zinc-800 rounded w-1/2"></div>5
        <div className="h-4 bg-zinc-800 rounded"></div>
        <div className="h-4 bg-zinc-800 rounded w-2/3"></div>
      </div>
    </div>
  );
};
export default GroupSkeleton;
