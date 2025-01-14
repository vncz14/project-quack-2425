"use client";

import Link from "next/link";
import {
  NavigationMenu, NavigationMenuItem, NavigationMenuLink, 
  NavigationMenuList, navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"
import LoginLogoutButton from "@/components/ui/loginButton";

export default function Navbar() {
  const guest_nav_links = ['/', 'login']
  const logged_in_navLinks = ["/", "profile", "radar", "events", "people-search", "settings", "log-out"];
  return (
    <div className="">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <div className="flex gap-3">
              {guest_nav_links.map((link, index) => 
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle() + " text-[#F8EDE3] !bg-[#7D6E83]"}
                  href={link} key={index}
                  >
                    {link}
                  </NavigationMenuLink>
              )}
              <LoginLogoutButton/>
            </div>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}
