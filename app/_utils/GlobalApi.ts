import axios, { AxiosInstance, AxiosResponse } from "axios";
import useSWR from "swr";

const apiKey: string | undefined = process.env.NEXT_PUBLIC_REST_API_KEY;
const apiUrl: string = "http://localhost:1337/api";

const axiosClient: AxiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    Authorization: `Bearer ${apiKey}`,
  },
});

const getLatestProducts = (): Promise<AxiosResponse<Product[]>> =>
  axiosClient.get("/products?populate=*");

const getProductById = (id: string) => {
  return axiosClient.get(`/products/${id}?populate=*`);
};

const getProductListByCategory = (category: string) => {
  return axiosClient.get(
    `/products?filters[category][$eq]=${category}&populate=*`
  );
};

// add to cart collection
const addToCart = (data: string) => axiosClient.post("/carts", data);

// get user cart
const getUserCartItems = (email: string) =>
  axiosClient.get(
    `/carts?populate[products][populate][0]=banner&filters[email][$eq]=${email}`
  );

export default {
  getLatestProducts,
  getProductById,
  getProductListByCategory,
  addToCart,
  getUserCartItems,
};
