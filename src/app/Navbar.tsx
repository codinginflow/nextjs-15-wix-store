import logo from "@/assets/logo.png";
import SearchField from "@/components/SearchField";
import UserButton from "@/components/UserButton";
import { getWixServerClient } from "@/lib/wix-client.server";
import { getCart } from "@/wix-api/cart";
import { getCollections } from "@/wix-api/collections";
import { getLoggedInMember } from "@/wix-api/members";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import MainNavigation from "./MainNavigation";
import MobileMenu from "./MobileMenu";
import ShoppingCartButton from "./ShoppingCartButton";

export default async function Navbar() {
  const wixClient = getWixServerClient();

  const [cart, loggedInMember, collections] = await Promise.all([
    getCart(wixClient),
    getLoggedInMember(wixClient),
    getCollections(wixClient),
  ]);

  return (
    <header className="bg-background shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 p-5">
        <Suspense>
          <MobileMenu
            collections={collections}
            loggedInMember={loggedInMember}
          />
        </Suspense>
        <div className="flex flex-wrap items-center gap-5">
          <Link href="/" className="flex items-center gap-4">
            <Image src={logo} alt="Flow Shop logo" width={40} height={40} />
            <span className="text-xl font-bold">Flow Shop</span>
          </Link>
          <MainNavigation
            collections={collections}
            className="hidden lg:flex"
          />
        </div>
        <SearchField className="hidden max-w-96 lg:inline" />
        <div className="flex items-center justify-center gap-5">
          <UserButton
            loggedInMember={loggedInMember}
            className="hidden lg:inline-flex"
          />
          <ShoppingCartButton initialData={cart} />
        </div>
      </div>
    </header>
  );
}
