import * as H from "@damarkuncoro/layout-engine"
import React from "react"
import { renderNodeToReact } from "./renderReact.js"
import { useViewport, BreakpointsProvider, useResponsive } from "./viewport.js"


// Navbar-engine wrapper
import * as N from "@damarkuncoro/navbar-engine"
export type { NavbarProps } from "@damarkuncoro/navbar-engine"

// Sidebar-engine wrapper
import * as S from "@damarkuncoro/sidebar-engine"
export type { SidebarProps, SidebarHeaderProps, SidebarFooterProps, SidebarContentProps, SidebarGroupProps, SidebarItemProps } from "@damarkuncoro/sidebar-engine"

export function Sidebar(props: S.SidebarProps) {
  const vw = useViewport()
  const node = S.Sidebar({ viewportWidth: props.viewportWidth ?? vw, ...props })
  return renderNodeToReact(node)
}

export namespace Sidebar {
  export function Header(props: S.SidebarHeaderProps) {
    const vw = useViewport()
    const node = S.SidebarHeader({ viewportWidth: props.viewportWidth ?? vw, ...props })
    return renderNodeToReact(node)
  }
  export function Footer(props: S.SidebarFooterProps) {
    const vw = useViewport()
    const node = S.SidebarFooter({ viewportWidth: props.viewportWidth ?? vw, ...props })
    return renderNodeToReact(node)
  }
  export function Content(props: S.SidebarContentProps) {
    const vw = useViewport()
    const node = S.SidebarContent({ viewportWidth: props.viewportWidth ?? vw, ...props })
    return renderNodeToReact(node)
  }
  export function Main(props: S.SidebarContentProps) {
    const vw = useViewport()
    const node = (S.Sidebar as any).Main({ viewportWidth: props.viewportWidth ?? vw, ...props })
    return renderNodeToReact(node)
  }
  export function Group(props: S.SidebarGroupProps) {
    const vw = useViewport()
    const node = S.SidebarGroup({ viewportWidth: props.viewportWidth ?? vw, ...props })
    return renderNodeToReact(node)
  }
  export function Item(props: S.SidebarItemProps) {
    const vw = useViewport()
    const node = S.SidebarItem({ viewportWidth: props.viewportWidth ?? vw, ...props })
    return renderNodeToReact(node)
  }
}

export function Navbar(props: N.NavbarProps) {
  const vw = useViewport()
  const node = N.Navbar({ viewportWidth: props.viewportWidth ?? vw, ...props })
  return renderNodeToReact(node)
}
export function NavbarAutoVW(props: N.NavbarProps & { viewportWidth?: number }) {
  const vw = useViewport()
  const node = (N as any).Navbar({ viewportWidth: props?.viewportWidth ?? vw, ...props })
  return renderNodeToReact(node)
}

export type {
  CSSLength,
  LayoutProps,
  HeadlessNode,
  SidebarLayoutContract,
  HeaderLayoutContract,
  DashboardLayoutContract,
  SplitLayoutContract,
  AuthLayoutContract,
  LandingLayoutContract,
  FlexProps,
  StackProps,
  GridProps,
  ContainerProps,
  ResponsiveValue,
  BreakpointKey,
  Theme,
  ColorScheme
} from "@damarkuncoro/layout-engine"

export type {
  BlogPostPresetProps,
  BlogListPresetProps,
  ProductGridPresetProps,
  ProductDetailPresetProps,
  CartPresetProps,
  StatsGridPresetProps,
  DataTablePresetProps,
  DashboardWidgetPresetProps,
  SettingsPagePresetProps,
  SettingsSectionPresetProps,
  DocsPagePresetProps,
  ProfilePagePresetProps
} from "@damarkuncoro/layout-engine"

export {
  resolveResponsive,
  breakpoints,
  theme,
  themeLight,
  themeDark,
  getTheme,
  getSystemColorScheme
} from "@damarkuncoro/layout-engine"

// Preset wrappers (convert headless nodes to React elements)
export function StatsGridPreset(props: H.StatsGridPresetProps) {
  const node = (H as any).StatsGridPreset(props as any)
  return renderNodeToReact(node)
}
export function ProductGridPreset(props: H.ProductGridPresetProps) {
  const node = (H as any).ProductGridPreset(props as any)
  return renderNodeToReact(node)
}
export function ProductDetailPreset(props: H.ProductDetailPresetProps) {
  const node = (H as any).ProductDetailPreset(props as any)
  return renderNodeToReact(node)
}
export function BlogPostPreset(props: H.BlogPostPresetProps) {
  const node = (H as any).BlogPostPreset(props as any)
  return renderNodeToReact(node)
}
export function BlogListPreset(props: H.BlogListPresetProps) {
  const node = (H as any).BlogListPreset(props as any)
  return renderNodeToReact(node)
}
export function CartPreset(props: H.CartPresetProps) {
  const node = (H as any).CartPreset(props as any)
  return renderNodeToReact(node)
}
export function DataTablePreset(props: H.DataTablePresetProps) {
  const node = (H as any).DataTablePreset(props as any)
  return renderNodeToReact(node)
}
export function DashboardWidgetPreset(props: H.DashboardWidgetPresetProps) {
  const node = (H as any).DashboardWidgetPreset(props as any)
  return renderNodeToReact(node)
}
export function SettingsPagePreset(props: H.SettingsPagePresetProps) {
  const node = (H as any).SettingsPagePreset(props as any)
  return renderNodeToReact(node)
}
export function SettingsSectionPreset(props: H.SettingsSectionPresetProps) {
  const node = (H as any).SettingsSectionPreset(props as any)
  return renderNodeToReact(node)
}
export function DocsPagePreset(props: H.DocsPagePresetProps) {
  const node = (H as any).DocsPagePreset(props as any)
  return renderNodeToReact(node)
}
export function ProfilePagePreset(props: H.ProfilePagePresetProps) {
  const node = (H as any).ProfilePagePreset(props as any)
  return renderNodeToReact(node)
}

export interface ReactBaseProps {
  children?: any
  tag?: any
  className?: string
  style?: React.CSSProperties
  id?: string
  [key: string]: any
}

export interface ReactBoxProps extends Omit<H.LayoutProps, "style">, ReactBaseProps {
  style?: React.CSSProperties
}

export function Box(props: ReactBoxProps): any {
  const vw = useViewport()
  const node = H.Box({ viewportWidth: props.viewportWidth ?? vw, ...props })
  return renderNodeToReact(node)
}

export function Flex(props: H.FlexProps & ReactBaseProps): any {
  const vw = useViewport()
  const node = H.Flex({ viewportWidth: props.viewportWidth ?? vw, ...props })
  return renderNodeToReact(node)
}

export function Stack(props: H.StackProps & ReactBaseProps): any {
  const vw = useViewport()
  const node = H.Stack({ viewportWidth: props.viewportWidth ?? vw, ...props })
  return renderNodeToReact(node)
}

export function Grid(props: H.GridProps & ReactBaseProps): any {
  const vw = useViewport()
  const node = H.Grid({ viewportWidth: props.viewportWidth ?? vw, ...props })
  return renderNodeToReact(node)
}

export function Container(props: H.ContainerProps & ReactBaseProps): any {
  const vw = useViewport()
  const node = H.Container({ viewportWidth: props.viewportWidth ?? vw, ...props })
  return renderNodeToReact(node)
}

export function Spacer(props: { size?: any } & ReactBaseProps): any {
  const node = H.Spacer(props)
  return renderNodeToReact(node)
}

export function Center(props: ReactBaseProps): any {
  const node = H.Center(props)
  return renderNodeToReact(node)
}

export function SidebarLayout(props: any) {
  const node = H.SidebarLayout(props)
  return renderNodeToReact(node)
}

export function SidebarLayoutAutoVW(props: any) {
  const vw = useViewport()
  const node = H.SidebarLayout({ viewportWidth: props?.viewportWidth ?? vw, ...props })
  return renderNodeToReact(node)
}

export function HeaderLayout(props: H.HeaderLayoutContract) {
  const node = H.HeaderLayout(props)
  return renderNodeToReact(node)
}

export function SplitLayout(props: H.SplitLayoutContract) {
  const vw = useViewport()
  const node = H.SplitLayout({ viewportWidth: props?.viewportWidth ?? vw, ...props })
  return renderNodeToReact(node)
}

export interface ReactDashboardLayoutProps extends Omit<H.DashboardLayoutProps, "header" | "sidebar" | "children"> {
  header?: any
  sidebar?: any
  children?: any
}

export function DashboardLayout(props: ReactDashboardLayoutProps) {
  const vw = useViewport()
  const node = H.DashboardLayout({ viewportWidth: props?.viewportWidth ?? vw, ...props } as any)
  return renderNodeToReact(node)
}

export function AuthLayout(props: H.AuthLayoutContract) {
  const node = H.AuthLayout(props)
  return renderNodeToReact(node)
}

export function LandingLayout(props: H.LandingLayoutContract) {
  const node = H.LandingLayout(props)
  return renderNodeToReact(node)
}

export function HeaderContentFooter(props: { header: any; content: any; footer: any }) {
  const node = (H as any).HeaderContentFooter(props as any)
  return renderNodeToReact(node)
}

export { renderNodeToReact } from "./renderReact.js"
export { useViewport, BreakpointsProvider, useResponsive }
