import * as H from "@damarkuncoro/layout-engine"
import React from "react"
import { renderNodeToReact } from "./renderReact.js"
import { useViewport, BreakpointsProvider, useResponsive } from "./viewport.js"


// Navbar-engine wrapper
import * as N from "@damarkuncoro/navbar-engine"
export type { NavbarProps } from "@damarkuncoro/navbar-engine"
export function Navbar(props: N.NavbarProps) {
  const node = N.Navbar(props)
  return renderNodeToReact(node)
}
export function NavbarAutoVW(props: N.NavbarProps & { viewportWidth?: number }) {
  const vw = useViewport()
  const node = (N as any).Navbar({ viewportWidth: props?.viewportWidth ?? vw, ...props })
  return renderNodeToReact(node)
}
export function NavbarTransparentSolid(props: N.NavbarProps) {
  const node = (N as any).NavbarTransparentSolid(props as any)
  return renderNodeToReact(node)
}
export function NavbarTransparentSolidAutoVW(props: N.NavbarProps & { viewportWidth?: number }) {
  const vw = useViewport()
  const node = (N as any).NavbarTransparentSolid({ viewportWidth: props?.viewportWidth ?? vw, ...props })
  return renderNodeToReact(node)
}
export function NavbarTopStickyLight(props: N.NavbarProps) {
  const node = (N as any).NavbarTopStickyLight(props as any)
  return renderNodeToReact(node)
}
export function NavbarTopStickyLightAutoVW(props: N.NavbarProps & { viewportWidth?: number }) {
  const vw = useViewport()
  const node = (N as any).NavbarTopStickyLight({ viewportWidth: props?.viewportWidth ?? vw, ...props })
  return renderNodeToReact(node)
}
export function NavbarCenteredBrand(props: N.NavbarProps) {
  const node = (N as any).NavbarCenteredBrand(props as any)
  return renderNodeToReact(node)
}
export function NavbarCenteredBrandAutoVW(props: N.NavbarProps & { viewportWidth?: number }) {
  const vw = useViewport()
  const node = (N as any).NavbarCenteredBrand({ viewportWidth: props?.viewportWidth ?? vw, ...props })
  return renderNodeToReact(node)
}
export function NavbarUnderlineOnly(props: N.NavbarProps) {
  const node = (N as any).NavbarUnderlineOnly(props as any)
  return renderNodeToReact(node)
}
export function NavbarUnderlineOnlyAutoVW(props: N.NavbarProps & { viewportWidth?: number }) {
  const vw = useViewport()
  const node = (N as any).NavbarUnderlineOnly({ viewportWidth: props?.viewportWidth ?? vw, ...props })
  return renderNodeToReact(node)
}

export function NavbarTransparentSolidAuto(props: N.NavbarProps & { viewportWidth?: number }) {
  const vw = useViewport()
  const [scrolled, setScrolled] = React.useState(false)
  const [reduceMotion, setReduceMotion] = React.useState(false)
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])
  React.useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)")
    const apply = () => setReduceMotion(!!mq?.matches)
    apply()
    mq?.addEventListener?.("change", apply)
    return () => mq?.removeEventListener?.("change", apply)
  }, [])
  const node = (N as any).NavbarTransparentSolid({
    viewportWidth: props?.viewportWidth ?? vw,
    scrolled,
    reduceMotion,
    ...props
  })
  return renderNodeToReact(node)
}

export function NavbarGlassBlur(props: N.NavbarProps) {
  const node = (N as any).NavbarGlassBlur(props as any)
  return renderNodeToReact(node)
}
export function NavbarGlassBlurAutoVW(props: N.NavbarProps & { viewportWidth?: number }) {
  const vw = useViewport()
  const node = (N as any).NavbarGlassBlur({ viewportWidth: props?.viewportWidth ?? vw, ...props })
  return renderNodeToReact(node)
}

export function NavbarModern(props: N.NavbarProps) {
  const node = (N as any).NavbarModern(props as any)
  return renderNodeToReact(node)
}
export function NavbarModernAutoVW(props: N.NavbarProps & { viewportWidth?: number }) {
  const vw = useViewport()
  const node = (N as any).NavbarModern({ viewportWidth: props?.viewportWidth ?? vw, ...props })
  return renderNodeToReact(node)
}
export function NavbarBrutalist(props: N.NavbarProps) {
  const node = (N as any).NavbarBrutalist(props as any)
  return renderNodeToReact(node)
}
export function NavbarBrutalistAutoVW(props: N.NavbarProps & { viewportWidth?: number }) {
  const vw = useViewport()
  const node = (N as any).NavbarBrutalist({ viewportWidth: props?.viewportWidth ?? vw, ...props })
  return renderNodeToReact(node)
}
export function NavbarFloating(props: N.NavbarProps) {
  const node = (N as any).NavbarFloating(props as any)
  return renderNodeToReact(node)
}
export function NavbarFloatingAutoVW(props: N.NavbarProps & { viewportWidth?: number }) {
  const vw = useViewport()
  const node = (N as any).NavbarFloating({ viewportWidth: props?.viewportWidth ?? vw, ...props })
  return renderNodeToReact(node)
}
export function NavbarTransparentSolidAutoWithOutsideClose(props: N.NavbarProps & { viewportWidth?: number }) {
  const vw = useViewport()
  const [scrolled, setScrolled] = React.useState(false)
  const [reduceMotion, setReduceMotion] = React.useState(false)
  const ref = React.useRef<HTMLDivElement | null>(null)
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])
  React.useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)")
    const apply = () => setReduceMotion(!!mq?.matches)
    apply()
    mq?.addEventListener?.("change", apply)
    return () => mq?.removeEventListener?.("change", apply)
  }, [])
  React.useEffect(() => {
    const handler = (e: any) => {
      if (!props.menuOpen) return
      const el = ref.current
      if (el && e.target && !el.contains(e.target)) {
        props.onMenuToggle?.(e)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [props.menuOpen])
  React.useEffect(() => {
    if (!props.menuOpen) return
    const panelId = (props as any).menuId ?? "navbar-menu"
    const panel = document.getElementById(panelId)
    if (!panel) return
    const selector = (props as any).menuItemSelector ?? 'a,button,[role="menuitem"]'
    const items = Array.from(panel.querySelectorAll(selector)) as HTMLElement[]
    const focusFirst = () => items[0]?.focus?.()
    const onKey = (e: KeyboardEvent) => {
      const { key } = e
      if (!items.length) return
      const currentIndex = items.findIndex((it) => it === document.activeElement)
      const next = (i: number) => items[(i + items.length) % items.length]?.focus?.()
      if (key === "ArrowDown" || key === "ArrowRight") {
        e.preventDefault()
        if (currentIndex < 0) focusFirst()
        else next(currentIndex + 1)
      } else if (key === "ArrowUp" || key === "ArrowLeft") {
        e.preventDefault()
        if (currentIndex < 0) items[items.length - 1]?.focus?.()
        else next(currentIndex - 1)
      } else if (key === "Home") {
        e.preventDefault()
        focusFirst()
      } else if (key === "End") {
        e.preventDefault()
        items[items.length - 1]?.focus?.()
      } else if (key === "Escape") {
        e.preventDefault()
        ;(props as any).onMenuToggle?.(e)
      }
    }
    panel.addEventListener("keydown", onKey as any)
    // Focus panel to enable keyboard nav if nothing focused
    ;(panel as any).focus?.()
    return () => panel.removeEventListener("keydown", onKey as any)
  }, [props.menuOpen, (props as any).menuId, (props as any).menuItemSelector])
  const node = (N as any).NavbarTransparentSolid({
    viewportWidth: props?.viewportWidth ?? vw,
    scrolled,
    reduceMotion,
    ...props
  })
  return React.createElement("div", { ref }, renderNodeToReact(node))
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

export interface ReactBoxProps extends H.LayoutProps {
  children?: any
  tag?: any
  onClick?: any
  href?: any
  type?: any
  [key: string]: any
}

export function Box(props: ReactBoxProps): any {
  const node = H.Box(props)
  return renderNodeToReact(node)
}

export function Flex(props: H.FlexProps & { children?: any; tag?: any; onClick?: any; [key: string]: any }): any {
  const node = H.Flex(props)
  return renderNodeToReact(node)
}

export function Stack(props: H.StackProps & { children?: any; tag?: any; [key: string]: any }): any {
  const node = H.Stack(props)
  return renderNodeToReact(node)
}

export function Grid(props: H.GridProps & { children?: any; tag?: any; [key: string]: any }): any {
  const node = H.Grid(props)
  return renderNodeToReact(node)
}

export function Container(props: H.ContainerProps & { children?: any; tag?: any; [key: string]: any }): any {
  const node = H.Container(props)
  return renderNodeToReact(node)
}

export function Spacer(props: { size?: any; [key: string]: any }): any {
  const node = H.Spacer(props)
  return renderNodeToReact(node)
}

export function Center(props: any): any {
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

export function DashboardLayout(props: H.DashboardLayoutProps) {
  const vw = useViewport()
  const node = H.DashboardLayout({ viewportWidth: props?.viewportWidth ?? vw, ...props })
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
