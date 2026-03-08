import { Box, Container, theme, Flex } from "@damarkuncoro/layout-engine"
import { NAVBAR_DEFAULTS } from "../constants/defaults.js"
import type { NavbarMobilePanelProps, NavMenuItem } from "../contracts.js"

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

  // Helper untuk merender Search Bar Mobile
  const renderMobileSearch = (searchProps?: any) => {
    if (!searchProps || !searchProps.showOnMobile) return null
    return Box({
      style: { padding: "12px 16px", borderBottom: `1px solid ${theme.border}` },
      children: Box({
        tag: "input",
        placeholder: searchProps.placeholder || "Search...",
        value: searchProps.value,
        onInput: (e: any) => searchProps.onChange?.(e.target.value),
        style: {
          width: "100%",
          padding: "10px 16px",
          borderRadius: theme.radiusMd,
          border: `1px solid ${theme.border}`,
          backgroundColor: theme.bgSubtle,
          fontSize: theme.textBase
        }
      })
    })
  }

  // Helper untuk merender Actions Mobile
  const renderMobileActions = (actionsList?: any[]) => {
    if (!actionsList || actionsList.length === 0) return null
    return Flex({
      direction: "column",
      gap: "8px",
      style: { padding: "16px" },
      children: actionsList.map(action => 
        Box({
          tag: action.href ? "a" : "button",
          key: action.id,
          href: action.href,
          onClick: action.onClick,
          style: {
            width: "100%",
            padding: "12px",
            textAlign: "center",
            borderRadius: theme.radiusMd,
            fontSize: theme.textBase,
            fontWeight: theme.fontSemibold,
            textDecoration: "none",
            backgroundColor: action.variant === "primary" ? theme.primary : theme.bgMuted,
            color: action.variant === "primary" ? theme.primaryFg : theme.fg,
            border: "none"
          },
          children: action.label
        })
      )
    })
  }

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
    style: { padding: "8px 0" },
    children: [
      renderMobileSearch(search),
      mobileContent ? Box({ style: { padding: NAVBAR_DEFAULTS.BAR_PADDING }, children: mobileContent }) : null,
      renderMobileActions(actions)
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
