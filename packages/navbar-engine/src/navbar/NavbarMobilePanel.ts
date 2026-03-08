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
      children: items.map((item: NavMenuItem) => {
        const hasDropdown = item.dropdown && item.dropdown.length > 0
        
        return Box({
          tag: "li",
          key: item.id,
          children: [
            Box({
              tag: "a",
              href: item.href || "#",
              style: {
                textDecoration: "none",
                color: "inherit",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px 16px",
                fontSize: theme.textBase,
                borderRadius: theme.radiusMd,
                backgroundColor: item.isActive ? theme.bgSubtle : "transparent"
              },
              children: [
                Flex({
                  align: "center",
                  gap: "8px",
                  children: [
                    item.icon ? Box({ children: item.icon }) : null,
                    Box({ children: item.label })
                  ].filter(Boolean)
                }),
                hasDropdown ? Box({ style: { transition: NAVBAR_DEFAULTS.TRANSITION_FAST }, children: "▾" }) : null
              ].filter(Boolean)
            }),
            // Render Dropdown (Mobile Accordion-style)
            hasDropdown ? Box({
              tag: "ul",
              style: {
                listStyle: "none",
                margin: 0,
                padding: "0 0 8px 32px", // Indented for hierarchy
                display: menuOpen ? "block" : "none", // Simplistic for now, can be state-driven
              },
              children: item.dropdown?.map((sub: NavMenuItem) => 
                Box({
                  tag: "li",
                  key: sub.id,
                  children: Box({
                    tag: "a",
                    href: sub.href || "#",
                    style: {
                      display: "block",
                      padding: "10px 16px",
                      textDecoration: "none",
                      color: theme.fgMuted,
                      fontSize: theme.textSm,
                      borderRadius: theme.radiusSm,
                    },
                    children: sub.label
                  })
                })
              )
            }) : null
          ].filter(Boolean)
        })
      })
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
