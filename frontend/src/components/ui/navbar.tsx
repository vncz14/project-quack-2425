"use client"

import Link from "next/link";
import { MenuSVG } from "./assets/svg";
import { useState } from "react";

function NavLinks() {
  return (
    <>
        <Link href="/">Home</Link>
        <Link href="/">Link1</Link>
        <Link href="/">Link2</Link>
        <Link href="/">Link3</Link>
    </>
  )
}

export default function Navbar () {
  const [isMiniMenu, toggleMiniMenu] = useState(false);
  return (
    <div className="w-full relative">
      <div className="hidden sm:flex gap-4 p-3">
        <NavLinks />
      </div>
      <div className="ml-auto w-fit p-3 sm:hidden">
        <button onClick={() => toggleMiniMenu(!isMiniMenu)} className="block">
          <MenuSVG />
        </button>
      </div>
      <div>
          {isMiniMenu ? 
            <div className="flex flex-col items-center bg-slate-300 gap-1 p-1 rounded-2xl sm:hidden"> 
              <NavLinks />
            </div> 
            : ""}
      </div>
    </div>
  )
}