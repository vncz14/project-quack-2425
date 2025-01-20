"use client";

import Link from "next/link";
import {
  NavigationMenu, NavigationMenuItem, NavigationMenuLink, 
  NavigationMenuList, navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"
import LoginLogoutButton from "@/components/ui/loginButton";
import { useEffect, useState } from "react";
import { hasCookie } from "cookies-next/client";

export default function Navbar() {
  const guest = ['/', 'login']
  const authenticated = ["/", "profile", "radar", "events", "people-search", "settings", "logout"];
  let navigationItems = hasCookie('csrftoken') ? authenticated : guest;
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => { // resolves https://nextjs.org/docs/messages/react-hydration-error
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="">
      <NavigationMenu>
        <NavigationMenuList>
              {navigationItems.map((link, index) => 
                <NavigationMenuItem key={index}>
                  <Link href={`${link}`} legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle() + " text-[#F8EDE3] !bg-[#7D6E83]"}>
                      {link}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              )}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}
