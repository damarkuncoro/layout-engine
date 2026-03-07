import type { CSSLength, HeadlessNode, ResponsiveValue } from "./types.js"
export type NodeLike = HeadlessNode | string | number | boolean | null | undefined

export interface SidebarLayoutContract {
  sidebar: NodeLike
  children: NodeLike
  sidebarWidth?: CSSLength | ResponsiveValue<CSSLength>
  viewportWidth?: number
}

export interface HeaderLayoutContract {
  header: NodeLike
  children: NodeLike
}

export interface DashboardLayoutContract {
  header: NodeLike
  sidebar: NodeLike
  children: NodeLike
}

export interface SplitLayoutContract {
  left: NodeLike
  right: NodeLike
  leftWidth?: CSSLength | ResponsiveValue<CSSLength>
  splitRatio?: string
  viewportWidth?: number
}

export interface AuthLayoutContract {
  children: NodeLike
  logo?: NodeLike
  subtitle?: string
}

export interface LandingLayoutContract {
  header?: NodeLike
  hero?: NodeLike
  features?: NodeLike
  pricing?: NodeLike
  footer?: NodeLike
  children?: NodeLike
}
