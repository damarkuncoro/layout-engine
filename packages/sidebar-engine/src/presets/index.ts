import { Sidebar } from "../sidebar/Sidebar.js"
import type { SidebarProps } from "../contracts.js"

// 1. Modern Sidebar (Default)
export function SidebarModernPreset(props: SidebarProps) {
  return Sidebar({ ...props })
}

// 2. Slim Sidebar (Collapsed by default)
export function SidebarSlimPreset(props: SidebarProps) {
  return Sidebar({ collapsed: true, ...props })
}

// 3. Floating Sidebar
export function SidebarFloatingPreset(props: SidebarProps) {
  return Sidebar({
    ...props,
    style: {
      height: "calc(100% - 32px)",
      margin: "16px",
      borderRadius: "16px",
      border: "1px solid rgba(0,0,0,0.1)",
      boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
      ...props.style
    }
  })
}
