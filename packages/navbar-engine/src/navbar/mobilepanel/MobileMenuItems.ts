import { Flex, Box, theme } from "@damarkuncoro/layout-engine"
import { NAVBAR_DEFAULTS } from "../../constants/defaults.js"
import type { NavMenuItem } from "../../contracts.js"

interface MobileMenuItemsProps {
  items: any
  menuOpen: boolean
}

export function MobileMenuItems({ items, menuOpen }: MobileMenuItemsProps) {
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
              padding: "0 0 8px 32px",
              display: menuOpen ? "block" : "none",
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
