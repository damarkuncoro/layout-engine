import { Flex } from "../primitives/Flex.js"
import type { LayoutProps, CSSLength } from "../system/types.js"

export interface CenterProps extends LayoutProps {
  inline?: boolean
  children?: any
}

/**
 * Center - menyejajarkan konten di tengah (horizontal & vertical)
 */
export function Center({
  inline = false,
  children,
  padding,
  margin,
  width,
  height,
  style,
  ...rest
}: CenterProps) {
  return Flex({
    display: inline ? "inline-flex" : "flex",
    justify: "center",
    align: "center",
    padding,
    margin,
    width,
    height,
    style,
    ...rest,
    children
  })
}