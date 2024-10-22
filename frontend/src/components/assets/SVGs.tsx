type SVGType = {
  height: number,
  width: number
}

export function MenuSVG () {
  return <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>
}
export function UnfoldSVG ({height, width}: SVGType) {
  return <svg xmlns="http://www.w3.org/2000/svg" height={height + 'px'} viewBox="0 -960 960 960" width={width + 'px'} fill="#5f6368"><path d="M480-120 300-300l58-58 122 122 122-122 58 58-180 180ZM358-598l-58-58 180-180 180 180-58 58-122-122-122 122Z"/></svg>
}