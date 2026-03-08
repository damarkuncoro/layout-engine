import { normalizeUnit } from "../core/styleResolver.js"
import type { LayoutProps, CSSLength } from "../system/types.js"
import { LAYOUT_DEFAULTS } from "../system/constants.js"

export interface ContainerProps extends LayoutProps {
  maxWidth?: CSSLength
  centerContent?: boolean
}

/**
 * Container - wrapper dengan max-width dan centering
 */
export function Container({
  children,
  maxWidth = LAYOUT_DEFAULTS.CONTAINER_MAX_WIDTH,
  centerContent = true,
  padding = LAYOUT_DEFAULTS.CONTAINER_PADDING,
  margin,
  width,
  height,
  display,
  style,
  ...rest
}: ContainerProps & { children?: any }) {
  const resolved: Record<string, any> = {
    padding: normalizeUnit(padding),
    margin: margin ? normalizeUnit(margin) : "0 auto",
    width: width ?? "100%",
    height: normalizeUnit(height),
    maxWidth: normalizeUnit(maxWidth),
    display: display ?? "block",
    ...(centerContent && { marginLeft: "auto", marginRight: "auto" }),
    ...style
  }
  return {
    type: "div",
    props: {
      style: resolved,
      ...rest,
      children
    }
  }
}