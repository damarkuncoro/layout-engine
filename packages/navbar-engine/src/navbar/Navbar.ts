import { Container, Box, theme, breakpoints, normalizeUnit } from "@damarkuncoro/layout-engine"
import type { NavbarProps } from "../contracts.js"
import { getBgForVariant, getNavbarRootStyle, computeNavbarHeight } from "./utils.js"
import { NavbarMainBar } from "./mainbar/index.js"
import { NavbarMobilePanel } from "./mobilepanel/index.js"
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
    barPadding,
    paddingY = NAVBAR_DEFAULTS.PADDING_Y,
    paddingX = NAVBAR_DEFAULTS.PADDING_X,
    shrinkPaddingY = NAVBAR_DEFAULTS.SHRINK_PADDING_Y,
    borderRadius = NAVBAR_DEFAULTS.BORDER_RADIUS,
    alignment = "center",
    isFloating = false,
    floatingMarginTop = NAVBAR_DEFAULTS.FLOATING_MARGIN_TOP,
    floatingWidth = NAVBAR_DEFAULTS.FLOATING_WIDTH,
    floatingMaxWidth = NAVBAR_DEFAULTS.FLOATING_MAX_WIDTH,
    activeItemId
  } = props

  const threshold =
    typeof collapseAt === "number"
      ? collapseAt
      : (breakpoints as Record<string, number>)[collapseAt ?? "md"] ?? (breakpoints as Record<string, number>).md
  const collapsed = typeof viewportWidth === "number" ? viewportWidth < threshold : false

  const computedHeight = computeNavbarHeight(height, scrolled, shrinkOnScroll)

  const bgResolved =
    (variant === "transparent" && scrolled && solidOnScroll 
      ? theme.bg ?? NAVBAR_DEFAULTS.FALLBACK_BG_LIGHT 
      : getBgForVariant(variant, background)) || NAVBAR_DEFAULTS.FALLBACK_BG_LIGHT

  const floatingMode = isFloating && !scrolled
  const effectiveBorderRadius = floatingMode ? (borderRadius || NAVBAR_DEFAULTS.FLOATING_BORDER_RADIUS) : borderRadius

  const rootStyle = getNavbarRootStyle({
    position,
    top,
    computedHeight: computedHeight as string,
    backgroundColor: bgResolved as string,
    elevation,
    border,
    borderRadius: effectiveBorderRadius as any,
    marginTop: floatingMode ? floatingMarginTop : undefined,
    width: floatingMode ? floatingWidth : "100%",
    maxWidth: floatingMode ? floatingMaxWidth : undefined,
    left: floatingMode ? "50%" : undefined,
    transform: floatingMode ? "translateX(-50%)" : undefined,
    zIndex: position === "sticky" || position === "fixed" ? 1000 : undefined,
    transition: reduceMotion ? "none" : "min-height 300ms ease, padding 300ms ease, background-color 300ms ease, box-shadow 300ms ease, transform 300ms ease, margin 300ms ease, border-radius 300ms ease, width 300ms ease",
    style
  })

  const mainBar = NavbarMainBar({
    left,
    center,
    right,
    search: props.search,
    actions: props.actions,
    collapsed,
    menuId,
    menuOpen,
    onMenuToggle,
    barPadding,
    paddingY: (scrolled && shrinkOnScroll) ? shrinkPaddingY : paddingY,
    paddingX,
    alignment,
    centerAbsolute,
    activeItemId
  })

  const mobilePanel = NavbarMobilePanel({
    collapsed,
    center,
    search: props.search,
    actions: props.actions,
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
