import * as H from "@damarkuncoro/layout-engine"
import { renderNodeToReact } from "./renderReact.js"
import { useViewport, BreakpointsProvider, useResponsive } from "./viewport.js"

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

export function Box(props: H.LayoutProps & { children?: any }) {
  const node = H.Box(props)
  return renderNodeToReact(node)
}

export function Flex(props: H.FlexProps & { children?: any }) {
  const node = H.Flex(props)
  return renderNodeToReact(node)
}

export function Stack(props: H.StackProps & { children?: any }) {
  const node = H.Stack(props)
  return renderNodeToReact(node)
}

export function Grid(props: H.GridProps & { children?: any }) {
  const node = H.Grid(props)
  return renderNodeToReact(node)
}

export function Container(props: H.ContainerProps & { children?: any }) {
  const node = H.Container(props)
  return renderNodeToReact(node)
}

export function Spacer(props: { size?: any }) {
  const node = H.Spacer(props)
  return renderNodeToReact(node)
}

export function Center(props: any) {
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

export function DashboardLayout(props: H.DashboardLayoutContract) {
  const node = H.DashboardLayout(props)
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
