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
          <Link href="/categories" legacyBehavior passHref>
            <NavigationMenuLink
              className={cn([
                navigationMenuTriggerStyle(),
                "font-bold uppercase",
              ])}
            >
              Thể loại
            </NavigationMenuLink>
          </Link>
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
