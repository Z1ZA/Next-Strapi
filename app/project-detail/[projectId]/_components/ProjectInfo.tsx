import { AlertOctagon, BadgeCheck, ShoppingCart } from "lucide-react";
import React, { useContext } from "react";
import SkeletonProjectInfo from "./SkeletonProjectInfo";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import GlobalApi from "@/app/_utils/GlobalApi";
import { error } from "console";
import { CartContext } from "@/app/_context/CartContext";

function ProjectInfo({ product }) {
  const { user } = useUser();
  const router = useRouter();
  const { cart, setCart } = useContext(CartContext);
  // add to cart
  const addToCartClick = () => {
    if (!user) {
      router.push("/sign-in");
      return;
    } else {
      // add to cart logic
      const data = {
        data: {
          userName: user.fullName,
          email: user.primaryEmailAddress?.emailAddress,
          products: product?.id,
        },
      };
      GlobalApi.addToCart(data).then(
        (resp) => {
          console.log("Add to cart", resp);
          if (resp) {
            setCart((cart) => [
              ...cart,
              {
                id: resp?.data?.id,
                product: product,
              },
            ]);
          }
        },
        (error) => {
          console.log("Error", error);
        }
      );
    }
  };
  return (
    <div>
      {product ? (
        <div className="">
          <h2 className="text-lg">{product?.attributes?.title}</h2>
          <h2 className="text-md text-gray-400">
            {product?.attributes?.category}
          </h2>
          <h2 className="text-md mt-5 text-gray-700">
            {product?.attributes?.description}
          </h2>

          <h2 className="text-2xl mt-5 font-medium">
            ${product?.attributes?.pricing}
          </h2>
          <button
            onClick={() => addToCartClick()}
            className="flex gap-2 p-3 bg-blue-500 text-white rounded-lg px-10 mt-5 hover:bg-blue-700"
          >
            <ShoppingCart />
            Add to cart
          </button>
        </div>
      ) : (
        <SkeletonProjectInfo />
      )}
    </div>
  );
}

export default ProjectInfo;
