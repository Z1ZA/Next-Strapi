"use client";
import React, { useEffect, useState } from "react";
import ProductList from "./ProductList";
import GlobalApi from "../_utils/GlobalApi";
import { AxiosResponse } from "axios";

function ProductSection(): JSX.Element {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    getLatestProducts_();
  }, []);

  const getLatestProducts_ = (): void => {
    GlobalApi.getLatestProducts().then((resp: AxiosResponse) => {
      console.log(resp.data.data);
      setProductList(resp.data.data);
    });
  };

  const filterProductList = (category) => {
    const result = productList.filter(
      (item) => item.attributes.category == category
    );
    return result;
  };

  return (
    productList && (
      <div className="md:px-20 px-10">
        <h2 className="font-bold text-lg my-3">Trending</h2>
        <ProductList productList={productList} />
        {/* another */}
        <h2 className="font-bold text-lg my-3">Hot sales</h2>
        <ProductList productList={productList} />
      </div>
    )
  );
}

export default ProductSection;

// use swr
