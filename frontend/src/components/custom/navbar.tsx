"use client";

import Link from "next/link";
import {
  NavigationMenu, NavigationMenuItem, NavigationMenuLink, 
  NavigationMenuList, navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"
import LoginLogoutButton from "@/components/ui/loginButton";

export default function Navbar() {
  const navLinks = ["/", "link1", "link2", "link3"];
  return (
    <div className="">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <div className="flex gap-3">
              {navLinks.map((link, index) => 
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
