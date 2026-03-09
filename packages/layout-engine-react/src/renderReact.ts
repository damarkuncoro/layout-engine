import React from "react"
import { resolveResponsive } from "@damarkuncoro/layout-engine"

type HeadlessNode = { type: string; props: Record<string, any> }

const toChild = (c: any): any => {
  if (c === null || c === undefined || c === false) return null
  if (React.isValidElement(c)) return c
  if (Array.isArray(c))
    return c.map((item, idx) => {
      const v = toChild(item)
      if (React.isValidElement(v)) {
        if (v.key == null) {
          return React.cloneElement(v, { key: idx })
        }
        return v
      }
      return React.createElement(React.Fragment, { key: idx }, v)
    })
  if (typeof c === "object" && c.type && c.props) return renderNodeToReact(c as any)
  return c
}

export const renderNodeToReact = (node: HeadlessNode): any => {
  const { type, props } = node
  const { children, className, style, viewportWidth = 1024, ...rest } = props || {}
  
  const STYLE_PROPS = new Set([
    "marginTop","marginBottom","marginLeft","marginRight","margin",
    "paddingTop","paddingBottom","paddingLeft","paddingRight","padding",
    "width","height","display","justifyContent","alignItems","gap","flexDirection","flexWrap","flexGrow","flexShrink","flexBasis",
    "position","top","left","right","bottom",
    "background","backgroundColor","color","border","borderTop","borderBottom","borderLeft","borderRight","borderRadius",
    "fontSize","fontWeight","lineHeight","textAlign","cursor","zIndex",
    "boxSizing", "overflow", "overflowX", "overflowY"
  ])

  // Internal props that should NOT be passed to the DOM element
  const INTERNAL_PROPS = new Set([
    "direction", "justify", "align", "wrap", "columns", "rows", "viewportWidth", "centerContent", "maxWidth"
  ])

  const mergedProps: Record<string, any> = {}
  const mergedStyle: Record<string, any> = style ? { ...style } : {}
  
  for (const k in rest) {
    const val = (rest as any)[k]
    // Resolve responsive values if they look like ones
    const resolvedVal = (typeof val === 'object' && val !== null && !React.isValidElement(val))
      ? resolveResponsive(val, viewportWidth)
      : val

    if (STYLE_PROPS.has(k)) {
      mergedStyle[k] = resolvedVal
    } else if (!INTERNAL_PROPS.has(k)) {
      ;(mergedProps as any)[k] = resolvedVal
    }
  }
  
  if (className) mergedProps.className = className
  if (Object.keys(mergedStyle).length > 0) mergedProps.style = mergedStyle
  
  const child = toChild(children)
  return React.createElement(type, mergedProps, child)
}
