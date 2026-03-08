import { Box, Container, theme } from "@damarkuncoro/layout-engine"

export function NavbarMobilePanel({
  collapsed,
  center,
  menuId,
  menuOpen,
  bgResolved,
  reduceMotion,
  contained
}: any) {
  if (!collapsed || !center) return null

  const panelContent = Box({
    style: { padding: "8px 0" },
    children: center
  })

  return Box({
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
    children: contained ? Container({ children: panelContent }) : panelContent
  }) as any
}
