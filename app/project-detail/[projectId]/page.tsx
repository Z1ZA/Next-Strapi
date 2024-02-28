"use client";
import Breadcrumb from "@/app/_components/Breadcrumb";
import GlobalApi from "@/app/_utils/GlobalApi";
import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import ProjectBanner from "./_components/ProjectBanner";
import ProjectInfo from "./_components/ProjectInfo";
import ProductList from "@/app/_components/ProductList";
import { usePathname } from "next/navigation";

function ProjectDetail({ params }) {
  const path = usePathname(); //get url path
  const [productDetail, setProductDetail] = useState();
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    console.log("Project id", params?.projectId);
    getProductById_();
  }, []);

  const getProductById_ = () => {
    GlobalApi.getProductById(params?.projectId).then((resp: AxiosResponse) => {
      setProductDetail(resp.data.data);
      getProductListByCategory(resp.data.data);
    });
  };

  const getProductListByCategory = (product) => {
    GlobalApi.getProductListByCategory(product?.attributes?.category).then(
      (resp: AxiosResponse) => {
        console.log(resp);
        setProductList(resp.data.data);
      }
    );
  };

  return (
    <div className="p-6 py-12 md:px-28">
      <Breadcrumb path={path} />
      <div className="grid grid-cols-1 sm:grid-cols-2 justify-center mt-10 sm:gap-5 gap-5">
        <ProjectBanner product={productDetail} />
        <ProjectInfo product={productDetail} />
      </div>
      {productList && (
        <div className="mt-20">
          <h2 className="font-medium text-xl mb-4">Similar Product</h2>
          <ProductList productList={productList} />
        </div>
      )}
    </div>
  );
}

export default ProjectDetail;
