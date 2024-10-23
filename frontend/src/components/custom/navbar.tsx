"use client";

import Link from "next/link";
import {
  NavigationMenu, NavigationMenuItem, NavigationMenuLink, 
  NavigationMenuList, navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"

export default function Navbar() {
  const navLinks = ["/", "link1", "link2", "link3"];
  return (
    <div className="bg-[#DFD3C3] p-3 rounded shadow-inner shadow-lg">
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
            </div>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}
