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
  
  // Merge className and style like standard React
  const mergedProps: Record<string, any> = { ...rest }
  if (className) mergedProps.className = className
  if (style) mergedProps.style = { ...style }
  
  const child = toChild(children)
  return React.createElement(type, mergedProps, child)
}
