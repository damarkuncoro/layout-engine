import { Container, Box, theme, breakpoints, normalizeUnit } from "@damarkuncoro/layout-engine"
import type { NavbarProps } from "../contracts.js"
import { getBgForVariant, getNavbarRootStyle } from "./utils.js"
import { NavbarMainBar } from "./NavbarMainBar.js"
import { NavbarMobilePanel } from "./NavbarMobilePanel.js"
import { NAVBAR_DEFAULTS } from "../constants/defaults.js"

export function Navbar(props: NavbarProps) {
  const {
    left,
    center,
    right,
    height = NAVBAR_DEFAULTS.HEIGHT,
    position = "static",
    top = 0,
    variant = "light",
    background,
    elevation = false,
    border = false,
    contained = true,
    style,
    viewportWidth,
    collapseAt = "md",
    menuOpen = false,
    onMenuToggle,
    scrolled = false,
    shrinkOnScroll = false,
    solidOnScroll = false,
    centerAbsolute = false,
    menuId = "navbar-menu",
    reduceMotion = false,
    contentPadding,
    barPadding
  } = props

  const threshold =
    typeof collapseAt === "number"
      ? collapseAt
      : (breakpoints as any)[collapseAt ?? "md"] ?? (breakpoints as any).md
  const collapsed = typeof viewportWidth === "number" ? viewportWidth < threshold : false

  const computedHeight =
    (scrolled && shrinkOnScroll 
      ? normalizeUnit(typeof height === "number" ? Math.max(NAVBAR_DEFAULTS.HEIGHT_SHRUNK, (height as number) - 8) : height) 
      : normalizeUnit(height as any)) || `${NAVBAR_DEFAULTS.HEIGHT}px`

  const bgResolved =
    (variant === "transparent" && scrolled && solidOnScroll 
      ? (theme as any).bg ?? NAVBAR_DEFAULTS.FALLBACK_BG_LIGHT 
      : getBgForVariant(variant, background)) || NAVBAR_DEFAULTS.FALLBACK_BG_LIGHT

  const rootStyle = getNavbarRootStyle({
    position,
    top,
    computedHeight: computedHeight as string,
    backgroundColor: bgResolved as string,
    elevation,
    border,
    style
  })

  const mainBar = NavbarMainBar({
    left,
    center,
    right,
    collapsed,
    menuId,
    menuOpen,
    onMenuToggle,
    barPadding,
    centerAbsolute
  })

  const mobilePanel = NavbarMobilePanel({
    collapsed,
    center,
    menuId,
    menuOpen,
    bgResolved,
    reduceMotion,
    contained
  })

  const container = (children: any) =>
    contained ? Container({ padding: contentPadding, children }) : Box({ children })

  return Box({
    style: rootStyle,
    children: container(Box({ children: [mainBar, mobilePanel] }))
  })
}
