import { Box, Container, theme, Flex } from "@damarkuncoro/layout-engine"
import { NAVBAR_DEFAULTS } from "../constants/defaults.js"
import type { NavbarMobilePanelProps, NavMenuItem } from "../contracts.js"

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

  // Helper untuk merender menu item di panel mobile
  const renderMobileMenu = (items: any) => {
    if (!Array.isArray(items)) return items

    return Flex({
      tag: "ul",
      direction: "column",
      gap: "4px",
      style: { listStyle: "none", margin: 0, padding: 0 },
      children: items.map((item: NavMenuItem) => 
        Box({
          tag: "li",
          key: item.id,
          children: Box({
            tag: "a",
            href: item.href || "#",
            style: {
              textDecoration: "none",
              color: "inherit",
              display: "block",
              padding: "12px 16px",
              fontSize: theme.textBase,
              borderRadius: theme.radiusMd,
              backgroundColor: item.isActive ? theme.bgSubtle : "transparent"
            },
            children: [
              item.icon ? Box({ display: "inline-block", margin: "0 8px 0 0", children: item.icon }) : null,
              item.label
            ].filter(Boolean)
          })
        })
      )
    })
  }

  const mobileContent = renderMobileMenu(center)

  const panelContent = Box({
    style: { padding: NAVBAR_DEFAULTS.BAR_PADDING },
    children: mobileContent
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
