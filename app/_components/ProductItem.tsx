import { Boxes, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function ProductItem({ product }) {
  return (
    <Link href={`/project-detail/${product.id}`}>
      <div className="hover:border border-blue-300 p-1 rounded-lg">
        <Image
          src={product?.attributes?.banner?.data.attributes?.url}
          alt="banner"
          height={350}
          width={400}
          className="rounded-t-lg h-36 object-cover"
        />
        <div className="flex justify-between items-center p-3 shadow-md rounded-b-lg">
          <div className="">
            <h2 className="text-sm font-medium line-clamp-1">
              {product.attributes.title}
            </h2>
            {product?.attributes?.category && (
              <h2 className="text-xs flex items-center gap-2">
                <ChevronRight className="h-3 w-3" />
                {product?.attributes?.category}
              </h2>
            )}
          </div>
          <h2 className="font-medium">${product.attributes?.pricing}</h2>
        </div>
      </div>
    </Link>
  );
}

export default ProductItem;
