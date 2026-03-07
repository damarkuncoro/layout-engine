import * as H from "layout-engine"
import { renderNodeToReact } from "./renderReact.js"

export type {
  CSSLength,
  LayoutProps,
  HeadlessNode,
  SidebarLayoutContract,
  DashboardLayoutContract,
  FlexProps,
  StackProps,
  GridProps,
  ResponsiveValue,
  BreakpointKey
} from "layout-engine"

export {
  resolveResponsive,
  breakpoints
} from "layout-engine"

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

export function SidebarLayout(props: any) {
  const node = H.SidebarLayout(props)
  return renderNodeToReact(node)
}

export function DashboardLayout(props: H.DashboardLayoutContract) {
  const node = H.DashboardLayout(props)
  return renderNodeToReact(node)
}

export { renderNodeToReact } from "./renderReact.js"
