import React from "react"
type HeadlessNode = { type: string; props: Record<string, any> }

const toChild = (c: any): any => {
  if (c === null || c === undefined || c === false) return null
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
  const { children, className, style, ...rest } = props || {}
  
  const STYLE_PROPS = new Set([
    "marginTop","marginBottom","marginLeft","marginRight","margin",
    "paddingTop","paddingBottom","paddingLeft","paddingRight","padding",
    "width","height","display","justifyContent","alignItems","gap","flexDirection",
    "position","top","left","right","bottom",
    "background","backgroundColor","color","border","borderTop","borderBottom","borderLeft","borderRight","borderRadius",
    "fontSize","fontWeight","lineHeight","textAlign","cursor","zIndex"
  ])
  const mergedProps: Record<string, any> = {}
  const mergedStyle: Record<string, any> = style ? { ...style } : {}
  for (const k in rest) {
    if (STYLE_PROPS.has(k)) {
      mergedStyle[k] = (rest as any)[k]
    } else {
      ;(mergedProps as any)[k] = (rest as any)[k]
    }
  }
  if (className) mergedProps.className = className
  if (Object.keys(mergedStyle).length > 0) mergedProps.style = mergedStyle
  
  const child = toChild(children)
  return React.createElement(type, mergedProps, child)
}
