import {
  Collapsible, CollapsibleContent, CollapsibleTrigger
} from "@/components/ui/collapsible"

import { UnfoldSVG } from "../assets/SVGs"

export default function Footer () {
  return (
      <Collapsible className="mt-auto">
        <div className="flex flex-col items-center bg-[#DFD3C3] mt-5 relative w-full rounded shadow-inner sm:p-3">
          <div className="flex items-center justify-center p-3 rounded-xl gap-3 mt-3 sm:gap-8 sm:mt-0 w-full sm:bg-[#7D6E83]">
            <p className="text-xl sm:text-2xl sm:text-[#F8EDE3]">Project Quack 23-24</p>
            <CollapsibleTrigger 
              className="size-10 bg-[#F8EDE3] flex items-center justify-center rounded-xl"
              > 
              <UnfoldSVG height={20} width={20}/> 
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="w-full">
            <div className="flex flex-col mt-3 mb-3 bg-[#7D6E83] rounded-xl p-3 mx-1 sm:bg-transparent">
              <h2 className="text-[#F8EDE3] text-2xl self-center sm:text-black">
                About us
              </h2>
              <p className="text-[#F8EDE3] sm:text-black">
                Mentor Vince.
              </p>
              <p className="text-[#F8EDE3] sm:text-black">
                Mentees Joseph, Dereck, Riley, Jian, and Shahan.
              </p>
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>
  )
}