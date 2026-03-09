import { normalizeUnit } from "../core/styleResolver.js"
import { resolveResponsive } from "../core/responsiveSystem.js"
import type { LayoutProps, CSSLength, ResponsiveValue } from "../system/types.js"

export interface ContainerProps extends LayoutProps {
  maxWidth?: ResponsiveValue<CSSLength>
  centerContent?: ResponsiveValue<boolean>
}

/**
 * Container - wrapper dengan max-width dan centering
 */
export function Container({
  children,
  maxWidth,
  centerContent = true,
  padding,
  margin,
  width,
  height,
  display,
  className,
  id,
  tag = "div",
  style,
  viewportWidth = 1024,
  ...rest
}: ContainerProps & { children?: any; [key: string]: any }) {
  const resolvedCenter = resolveResponsive(centerContent, viewportWidth)
  const resolved: Record<string, any> = {
    padding: normalizeUnit(resolveResponsive(padding, viewportWidth)),
    margin: resolveResponsive(margin, viewportWidth) ? normalizeUnit(resolveResponsive(margin, viewportWidth)) : "0 auto",
    width: resolveResponsive(width, viewportWidth) ?? "100%",
    height: normalizeUnit(resolveResponsive(height, viewportWidth)),
    maxWidth: normalizeUnit(resolveResponsive(maxWidth as any, viewportWidth)),
    display: resolveResponsive(display, viewportWidth) ?? "block",
    ...(resolvedCenter && { marginLeft: "auto", marginRight: "auto" }),
    ...style
  }
  return {
    type: tag,
    props: {
      style: resolved,
      className,
      id,
      ...rest,
      children
    }
  }
}