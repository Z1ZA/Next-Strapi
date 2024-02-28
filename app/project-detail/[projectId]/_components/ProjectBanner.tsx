import Image from "next/image";
import React from "react";

function ProjectBanner({ product }) {
  return (
    <div className="flex flex-col items-end">
      {product ? (
        <Image
          src={product?.attributes?.banner?.data?.attributes?.url}
          alt="banner"
          width={400}
          height={400}
          className="rounded-lg object-cover"
        />
      ) : (
        <div className="h-[350px] w-[350px] bg-slate-200 rounded-lg animate-pulse"></div>
      )}
    </div>
  );
}

export default ProjectBanner;
