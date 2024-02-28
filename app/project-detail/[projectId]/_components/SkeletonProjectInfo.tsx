import React from "react";

function SkeletonProjectInfo() {
  return (
    <div className="flex flex-col gap-5">
      <div className="h-[20px] w-[400px] bg-slate-200 animate-pulse"></div>
      <div className="h-[20px] w-[100px] bg-slate-200 animate-pulse"></div>
      <div className="h-[20px] w-[400px] bg-slate-200 animate-pulse"></div>
      <div className="h-[20px] w-[400px] bg-slate-200 animate-pulse"></div>
      <div className="h-[20px] w-[400px] bg-slate-200 animate-pulse"></div>
      <div className="h-[20px] w-[80px] bg-slate-200 animate-pulse"></div>
    </div>
  );
}

export default SkeletonProjectInfo;
