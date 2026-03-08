import { Box, Flex, normalizeUnit } from "@damarkuncoro/layout-engine"
import { NAVBAR_DEFAULTS } from "../../constants/defaults.js"
import type { NavbarMainBarProps } from "../../contracts.js"
import { NavbarSearch } from "./NavbarSearch.js"
import { NavbarActions } from "./NavbarActions.js"
import { NavbarMenuItems } from "./NavbarMenuItems.js"

export function NavbarMainBar({
  left,
  center,
  right,
  collapsed,
  menuId,
  menuOpen,
  onMenuToggle,
  barPadding,
  paddingY,
  paddingX,
  alignment = "center",
  centerAbsolute,
  activeItemId,
  search,
  actions
}: NavbarMainBarProps) {
  const commonFlexProps = {
    justify: "space-between",
    align: "center",
    height: "100%",
    style: { 
      paddingLeft: normalizeUnit(paddingX as any),
      paddingRight: normalizeUnit(paddingX as any),
      paddingTop: normalizeUnit(paddingY as any),
      paddingBottom: normalizeUnit(paddingY as any),
      transition: "padding 300ms ease",
      ...(barPadding != null ? { padding: normalizeUnit(barPadding as any) } : {})
    }
  }

  const centerContent = NavbarMenuItems({ items: center, activeItemId })

  if (!centerAbsolute) {
    // Layout logic based on alignment
    const renderContent = () => {
      if (collapsed) {
        return [
          Box({ children: left }),
          (centerContent || search || actions)
            ? Box({
                tag: "button",
                role: "button",
                "aria-label": "Toggle menu",
                "aria-controls": menuId,
                "aria-expanded": !!menuOpen,
                onClick: onMenuToggle,
                onKeyDown: (e: any) => {
                  const k = e?.key
                  if (k === "Enter" || k === " ") {
                    e.preventDefault?.()
                    onMenuToggle?.(e)
                  }
                },
                style: { 
                  cursor: "pointer", 
                  padding: NAVBAR_DEFAULTS.BAR_PADDING, 
                  userSelect: "none",
                  background: "none",
                  border: "none",
                  fontSize: "1.5rem",
                  color: "inherit"
                },
                children: "☰"
              } as any)
            : Box({ children: right })
        ]
      }

      // Desktop layout based on alignment
      const leftPart = Box({ children: left })
      const centerPart = centerContent ? Box({ children: centerContent }) : null
      const searchPart = NavbarSearch(search as any)
      const actionsPart = NavbarActions({ actions: actions as any })

      switch (alignment) {
        case "left":
          return [
            Flex({ 
              gap: "32px", 
              align: "center", 
              children: [leftPart, centerPart].filter(Boolean) 
            }),
            Flex({ 
              gap: "16px", 
              align: "center", 
              children: [searchPart, actionsPart].filter(Boolean) 
            })
          ]
        case "right":
          return [
            leftPart,
            Flex({ 
              gap: "32px", 
              align: "center", 
              children: [centerPart, searchPart, actionsPart].filter(Boolean) 
            })
          ]
        case "between":
          return [
            leftPart,
            centerPart,
            Flex({ 
              gap: "16px", 
              align: "center", 
              children: [searchPart, actionsPart].filter(Boolean) 
            })
          ]
        case "center":
        default:
          return [
            leftPart,
            centerPart,
            Flex({ 
              gap: "16px", 
              align: "center", 
              children: [searchPart, actionsPart].filter(Boolean) 
            })
          ]
      }
    }

    return Flex({
      tag: "nav",
      ...commonFlexProps,
      children: renderContent().filter(item => item !== null)
    })
  }

  return Box({
    tag: "nav",
    style: { position: "relative", height: "100%" },
    children: [
      Flex({
        ...commonFlexProps,
        children: [Box({ children: left }), Box({ children: right })]
      }),
      !collapsed && centerContent
        ? Box({
            style: {
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)"
            },
            children: centerContent
          })
        : null
    ]
  })
}
