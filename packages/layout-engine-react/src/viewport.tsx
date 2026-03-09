import React from "react"
import { resolveResponsive, breakpoints as defaultBps } from "@damarkuncoro/layout-engine"

const Ctx = React.createContext<{ width: number; breakpoints: Record<string, number> }>({
  width: 1024,
  breakpoints: defaultBps
})

export function BreakpointsProvider(props: { initialWidth?: number; breakpoints?: Record<string, number>; children?: any }) {
  const [width, setWidth] = React.useState(
    props.initialWidth ?? (typeof window !== "undefined" ? window.innerWidth : 1024)
  )
  React.useEffect(() => {
    if (props.initialWidth != null) return
    
    let timeoutId: any = null
    const onResize = () => {
      if (timeoutId) return
      timeoutId = setTimeout(() => {
        setWidth(window.innerWidth)
        timeoutId = null
      }, 100)
    }

    window.addEventListener("resize", onResize)
    return () => {
      window.removeEventListener("resize", onResize)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [props.initialWidth])
  const value = React.useMemo(
    () => ({ width, breakpoints: props.breakpoints ?? defaultBps }),
    [width, props.breakpoints]
  )
  return React.createElement(Ctx.Provider, { value }, props.children)
}

export function useViewport() {
  const ctx = React.useContext(Ctx)
  return ctx.width
}

export function useResponsive<T>(value: any): T | undefined {
  const w = useViewport()
  return resolveResponsive(value, w) as T | undefined
}
