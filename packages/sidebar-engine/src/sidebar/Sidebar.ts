import { Box, Flex, Stack, normalizeUnit, theme } from "@damarkuncoro/layout-engine"
import type { 
  SidebarProps, 
  SidebarHeaderProps, 
  SidebarFooterProps, 
  SidebarGroupProps, 
  SidebarItemProps 
} from "../contracts.js"

// --- Sub-components ---

export function SidebarHeader({ children, style }: SidebarHeaderProps) {
  return Box({
    style: {
      padding: "24px",
      borderBottom: `1px solid ${theme.border}`,
      ...style
    },
    children
  })
}

export function SidebarFooter({ children, style }: SidebarFooterProps) {
  return Box({
    style: {
      padding: "24px",
      borderTop: `1px solid ${theme.border}`,
      marginTop: "auto",
      ...style
    },
    children
  })
}

export function SidebarGroup({ title, children, style }: SidebarGroupProps) {
  return Stack({
    gap: "8px",
    style: { padding: "16px 0", ...style },
    children: [
      title ? Box({
        style: {
          padding: "0 24px 8px",
          fontSize: "0.75rem",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          color: theme.fgSubtle
        },
        children: title
      }) : null,
      Box({ children })
    ].filter(Boolean)
  })
}

export function SidebarItem({ label, icon, active, badge, onClick, href, collapsed, style }: SidebarItemProps) {
  return Box({
    tag: href ? "a" : "button",
    href,
    onClick,
    style: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      width: "calc(100% - 16px)",
      padding: collapsed ? "12px" : "12px 24px",
      justifyContent: collapsed ? "center" : "flex-start",
      backgroundColor: active ? theme.bgSubtle : "transparent",
      color: active ? theme.primary : "inherit",
      border: "none",
      cursor: "pointer",
      textDecoration: "none",
      transition: "all 0.2s",
      borderRadius: "8px",
      margin: "0 8px",
      flexShrink: 0,
      "&:hover": { backgroundColor: theme.bgSubtle },
      ...style
    },
    children: [
      icon ? Box({ 
        style: { display: "flex", alignItems: "center", justifyContent: "center" },
        children: icon 
      }) : null,
      !collapsed ? Box({ 
        tag: "span",
        style: { flex: 1, fontSize: "0.875rem", fontWeight: active ? 600 : 500, textAlign: "left" },
        children: label 
      }) : null,
      !collapsed && badge ? Box({
        style: {
          padding: "2px 8px",
          backgroundColor: theme.primary,
          color: "#fff",
          borderRadius: "999px",
          fontSize: "0.75rem",
          fontWeight: 700
        },
        children: badge
      }) : null
    ].filter(Boolean)
  } as any)
}

// --- Main Sidebar Component ---

export function Sidebar(props: SidebarProps) {
  const {
    groups = [],
    header,
    footer,
    width = "280px",
    collapsed = false,
    background = "#fff",
    color = "inherit",
    padding,
    style,
    children
  } = props

  const sidebarStyle = {
    display: "flex",
    flexDirection: "column" as const,
    width: collapsed ? "80px" : normalizeUnit(width as any),
    height: "100%",
    backgroundColor: background,
    color,
    borderRight: `1px solid ${theme.border}`,
    transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    overflow: "hidden",
    ...style
  }

  if (children) {
    return Box({
      tag: "aside",
      style: sidebarStyle,
      children
    })
  }

  return Box({
    tag: "aside",
    style: sidebarStyle,
    children: [
      header ? SidebarHeader({ children: header }) : null,
      Box({
        style: { flex: 1, overflowY: "auto", padding: normalizeUnit(padding as any) },
        children: groups.map((group) => 
          SidebarGroup({
            key: group.id,
            title: group.title,
            children: group.items.map((item) => 
              SidebarItem({
                ...item,
                collapsed
              } as any)
            )
          } as any)
        )
      }),
      footer ? SidebarFooter({ children: footer }) : null
    ].filter(Boolean)
  })
}

Sidebar.Header = SidebarHeader
Sidebar.Footer = SidebarFooter
Sidebar.Group = SidebarGroup
Sidebar.Item = SidebarItem
