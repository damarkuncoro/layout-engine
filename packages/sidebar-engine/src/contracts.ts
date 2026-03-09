import { CSSLength } from "@damarkuncoro/layout-engine"

export interface SidebarItem {
  id: string
  label: string
  icon?: any
  href?: string
  onClick?: (e?: any) => void
  active?: boolean
  badge?: string | number
  children?: SidebarItem[]
}

export interface SidebarGroup {
  id: string
  title?: string
  items: SidebarItem[]
}

export interface SidebarProps {
  groups?: SidebarGroup[]
  header?: any
  footer?: any
  width?: CSSLength
  collapsed?: boolean
  background?: string
  color?: string
  padding?: CSSLength
  style?: Record<string, any>
  children?: any
  viewportWidth?: number
}

// Sub-component contracts
export interface SidebarHeaderProps {
  children: any
  style?: Record<string, any>
  viewportWidth?: number
}

export interface SidebarFooterProps {
  children: any
  style?: Record<string, any>
  viewportWidth?: number
}

export interface SidebarContentProps {
  children: any
  style?: Record<string, any>
  viewportWidth?: number
}

export interface SidebarGroupProps {
  title?: string
  children: any
  style?: Record<string, any>
  viewportWidth?: number
}

export interface SidebarItemProps {
  label: string
  icon?: any
  active?: boolean
  badge?: string | number
  onClick?: (e?: any) => void
  href?: string
  collapsed?: boolean
  style?: Record<string, any>
  viewportWidth?: number
}
