"use client";

import { Home } from "lucide-react";
import { Button } from "../ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useAppContext } from "@/context/dataCommonContext";

export default function SubHeader() {
  const { categories } = useAppContext();

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <Home />
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="font-bold uppercase">
            Thể loại
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-4 lg:w-[600px] max-h-[400px] overflow-y-auto">
              {categories.map((category) => (
                <Link href={`/categories/${category.slug}`} key={category._id}>
                  <Button
                    className="w-full font-bold text-black px-2"
                    variant={"ghost"}
                  >
                    {category.name}
                  </Button>
                </Link>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/search" legacyBehavior passHref>
            <NavigationMenuLink
              className={cn([
                navigationMenuTriggerStyle(),
                "font-bold uppercase",
              ])}
            >
              Tìm kiếm
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/my-list" legacyBehavior passHref>
            <NavigationMenuLink
              className={cn([
                navigationMenuTriggerStyle(),
                "font-bold uppercase",
              ])}
            >
              Truyện đã xem
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/my-favorite" legacyBehavior passHref>
            <NavigationMenuLink
              className={cn([
                navigationMenuTriggerStyle(),
                "font-bold uppercase",
              ])}
            >
              Truyện đã lưu
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
