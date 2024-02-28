"use client";

import React, { useContext, useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
} from "@nextui-org/react";
import Image from "next/image";
import { UserButton, useUser } from "@clerk/nextjs";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { CartContext } from "../_context/CartContext";
import GlobalApi from "../_utils/GlobalApi";
import Cart from "./Cart";

const Header = () => {
  const { user } = useUser();
  const [isLogin, setIsLogin] = useState();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const menuItems = ["Home", "Explore", "Project"];
  const { cart, setCart } = useContext(CartContext);
  const [openCart, setOpenCart] = useState(false);

  const getCartItems = () => {
    GlobalApi.getUserCartItems(user?.primaryEmailAddress?.emailAddress).then(
      (resp) => {
        const result = resp.data.data;
        result &&
          result.forEach((prd) => {
            setCart((cart) => [
              ...cart,
              {
                id: prd.id,
                product: prd.attributes.products.data[0],
              },
            ]);
          });
      }
    );
  };

  useEffect(() => {
    user && getCartItems();
  }, [user]);

  useEffect(() => {
    openCart == false && setOpenCart(false);
  }, [cart]);

  useEffect(() => {
    setIsLogin(window.location.href.toString().includes("sign-in"));
  }, []);

  return (
    !isLogin && (
      <div>
        <Navbar onMenuOpenChange={setIsMenuOpen}>
          <NavbarContent>
            <NavbarMenuToggle
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="sm:hidden"
            />
            <NavbarBrand>
              <Image src="/logo.svg" alt="logo" width={50} height={50} />
              {/* <p className="font-bold text-inherit">Logo</p> */}
            </NavbarBrand>
          </NavbarContent>

          <NavbarContent className="hidden sm:flex gap-4" justify="center">
            <NavbarItem isActive>
              <Link href="#" aria-current="page">
                Home
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="#" color="foreground">
                Explore
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link color="foreground" href="#">
                Project
              </Link>
            </NavbarItem>
          </NavbarContent>
          <NavbarContent justify="end">
            {/* <NavbarItem className="hidden lg:flex">
            <Link href="#">Login</Link>
          </NavbarItem> */}
            {!user ? (
              <NavbarItem>
                <Button
                  as={Link}
                  color="primary"
                  href="/sign-in"
                  variant="flat"
                >
                  Login
                </Button>
              </NavbarItem>
            ) : (
              <div className="flex items-center gap-5">
                <h2
                  className="flex items-center gap-1 cursor-pointer"
                  onClick={() => setOpenCart(!openCart)}
                >
                  <ShoppingCart />({cart?.length})
                </h2>
                <UserButton />
              </div>
            )}
            {openCart && <Cart />}
          </NavbarContent>
          <NavbarMenu>
            {menuItems.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  color={
                    index === 2
                      ? "primary"
                      : index === menuItems.length - 1
                      ? "danger"
                      : "foreground"
                  }
                  className="w-full"
                  href="#"
                  size="lg"
                >
                  {item}
                </Link>
              </NavbarMenuItem>
            ))}
          </NavbarMenu>
        </Navbar>
      </div>
    )
  );
};

export default Header;
