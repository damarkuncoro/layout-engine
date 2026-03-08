import { Box, Container, theme } from "@damarkuncoro/layout-engine"
import { NAVBAR_DEFAULTS } from "../../constants/defaults.js"
import type { NavbarMobilePanelProps } from "../../contracts.js"
import { MobileSearch } from "./MobileSearch.js"
import { MobileActions } from "./MobileActions.js"
import { MobileMenuItems } from "./MobileMenuItems.js"

export function NavbarMobilePanel({
  collapsed,
  center,
  search,
  actions,
  menuId,
  menuOpen,
  bgResolved,
  reduceMotion,
  contained
}: NavbarMobilePanelProps) {
  if (!collapsed || (!center && !search && !actions)) return null

  const mobileContent = MobileMenuItems({ items: center, menuOpen })

  const panelContent = Box({
    style: { padding: "8px 0" },
    children: [
      MobileSearch(search as any),
      mobileContent ? Box({ style: { padding: NAVBAR_DEFAULTS.BAR_PADDING }, children: mobileContent }) : null,
      MobileActions({ actions: actions as any })
    ].filter(Boolean)
  })

  return Box({
    tag: "div",
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
