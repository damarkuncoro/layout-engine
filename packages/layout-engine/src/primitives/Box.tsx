import { normalizeUnit } from "../core/styleResolver.js"
import { resolveResponsive } from "../core/responsiveSystem.js"
import type { LayoutProps } from "../system/types.js"

export { type LayoutProps }

/**
 * Komponen blok dasar yang memetakan LayoutProps → inline style.
 * Gunakan untuk membangun primitive lainnya.
 */
export function Box({
  tag = "div",
  children,
  padding,
  margin,
  width,
  height,
  display,
  className,
  id,
  style,
  viewportWidth = 1024,
  ...rest
}: (LayoutProps & { children?: any; tag?: string } & Record<string, any>)) {
  const resolved: Record<string, any> = {
    boxSizing: "border-box",
    padding: normalizeUnit(resolveResponsive(padding, viewportWidth)),
    margin: normalizeUnit(resolveResponsive(margin, viewportWidth)),
    width: normalizeUnit(resolveResponsive(width, viewportWidth)),
    height: normalizeUnit(resolveResponsive(height, viewportWidth)),
    display: resolveResponsive(display, viewportWidth),
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
