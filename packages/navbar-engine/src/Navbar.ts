import { Container, Flex, Box, theme, breakpoints, normalizeUnit } from "@damarkuncoro/layout-engine"
import type { NavbarProps } from "./contracts.js"

const bgForVariant = (variant?: string, fallbackBg?: string) => {
  if (fallbackBg) return fallbackBg
  switch (variant) {
    case "dark":
      return (theme as any).bgEmphasis ?? "#111827"
    case "light":
      return (theme as any).bg ?? "#ffffff"
    case "transparent":
      return "transparent"
    case "solid":
    default:
      return (theme as any).bg ?? "#ffffff"
  }
}

export function Navbar({
  left,
  center,
  right,
  height = 64,
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
}: NavbarProps) {
  const container = (children: any) =>
    contained ? Container({ padding: contentPadding, children }) : Box({ children })

  const threshold =
    typeof collapseAt === "number"
      ? collapseAt
      : (breakpoints as any)[collapseAt ?? "md"] ?? (breakpoints as any).md
  const collapsed = typeof viewportWidth === "number" ? viewportWidth < threshold : false

  const computedHeight =
    scrolled && shrinkOnScroll ? normalizeUnit(typeof height === "number" ? Math.max(48, (height as number) - 8) : height) : normalizeUnit(height as any)

  const bgResolved =
    variant === "transparent" && scrolled && solidOnScroll ? (theme as any).bg ?? "#ffffff" : bgForVariant(variant, background)

  const rootStyle: Record<string, any> = {
    position,
    top: normalizeUnit(top as any),
    minHeight: computedHeight,
    backgroundColor: bgResolved,
    boxShadow: elevation ? "0 1px 8px rgba(0,0,0,0.08)" : undefined,
    borderBottom: border ? `1px solid ${(theme as any).border}` : undefined,
    ...style
  }

  const barMain =
    !centerAbsolute
      ? Flex({
          justify: "space-between",
          align: "center",
          height: "100%",
          style: barPadding != null ? { padding: normalizeUnit(barPadding as any) } : undefined,
          children: [
            Box({ children: left }),
            !collapsed ? (center ? Box({ children: center }) : null) : null,
            collapsed && center
              ? Box({
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
                  style: { cursor: "pointer", padding: "8px 12px", userSelect: "none" },
                  children: "☰"
                } as any)
              : Box({ children: right })
          ]
        })
      : Box({
          style: { position: "relative", height: "100%" },
          children: [
            Flex({
              justify: "space-between",
              align: "center",
              height: "100%",
              style: barPadding != null ? { padding: normalizeUnit(barPadding as any) } : undefined,
              children: [Box({ children: left }), Box({ children: right })]
            }),
            center
              ? Box({
                  style: {
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)"
                  },
                  children: center
                })
              : null
          ]
        })

  const panel =
    collapsed && center
      ? (Box({
          id: menuId,
          role: "menu",
          tabIndex: -1,
          style: {
            borderTop: `1px solid ${(theme as any).border}`,
            backgroundColor: bgResolved,
            overflow: "hidden",
            maxHeight: menuOpen ? "400px" : "0px",
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? "translateY(0px)" : "translateY(-6px)",
            transition: reduceMotion ? "none" : "max-height 220ms ease, opacity 140ms ease, transform 180ms ease"
          },
          children: contained
            ? Container({
                children: Box({
                  style: { padding: "8px 0" },
                  children: center
                })
              })
            : Box({
                style: { padding: "8px 0" },
                children: center
              })
        }) as any)
      : null

  return Box({
    style: rootStyle,
    children: container(Box({ children: [barMain, panel] }))
  })
}
