import React from "react";
import ProductItem from "./ProductItem";

function ProductList({ productList }) {
  return (
    <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
      {productList.map(
        (item, index) =>
          index <= 3 && (
            <div key={index}>
              <ProductItem product={item} />
            </div>
          )
      )}
    </div>
  );
}

export default ProductList;
