import { Box, Container, theme } from "@damarkuncoro/layout-engine"
import { NAVBAR_DEFAULTS } from "../constants/defaults.js"
import type { NavbarMobilePanelProps } from "../contracts.js"

export function NavbarMobilePanel({
  collapsed,
  center,
  menuId,
  menuOpen,
  bgResolved,
  reduceMotion,
  contained
}: NavbarMobilePanelProps) {
  if (!collapsed || !center) return null

  const panelContent = Box({
    style: { padding: NAVBAR_DEFAULTS.GLASS_PADDING_Y },
    children: center
  })

  return Box({
    id: menuId,
    role: "menu",
    tabIndex: -1,
    style: {
      borderTop: `1px solid ${theme.border}`,
      backgroundColor: bgResolved,
      overflow: "hidden",
      maxHeight: menuOpen ? NAVBAR_DEFAULTS.MOBILE_MENU_MAX_HEIGHT : "0px",
      opacity: menuOpen ? 1 : 0,
      transform: menuOpen ? "translateY(0px)" : "translateY(-6px)",
      transition: reduceMotion ? "none" : NAVBAR_DEFAULTS.TRANSITION_PANEL
    },
    children: contained ? Container({ children: panelContent }) : panelContent
  }) as any
}
