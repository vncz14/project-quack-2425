import Link from "next/link";
import {
  NavigationMenu, NavigationMenuItem, NavigationMenuLink, 
  NavigationMenuList, navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"
import LoginLogoutButton from "@/components/ui/loginButton";
import { cookies } from 'next/headers'
import { useEffect } from "react";

export async function getServerSideProps(context) {
  const cookies = context.req.headers.cookie;
  console.log(cookies)
  return {
    props: {},
  };
}
export default async function Navbar() {

  const cookieStore = await cookies()
  const guest = ['/', 'login']
  const authenticated = ["/", "profile", "radar", "events", "people-search", "settings", "logout"];
  let navigationItems = cookieStore.has('csrftoken') ? authenticated : guest
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
