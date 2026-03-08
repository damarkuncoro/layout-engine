import { CSSLength } from "@damarkuncoro/layout-engine"

export type HeroPattern = "split" | "centered" | "fullscreen" | "overlap"

export interface HeroAction {
  id?: string
  label: string
  href?: string
  onClick?: (e?: any) => void
  variant?: "primary" | "secondary" | "outline" | "ghost"
  icon?: any
}

export interface HeroProps {
  pattern?: HeroPattern
  title?: any
  description?: any
  actions?: HeroAction[]
  visual?: any
  height?: CSSLength
  minHeight?: CSSLength
  maxHeight?: CSSLength
  background?: string
  paddingY?: CSSLength
  paddingX?: CSSLength
  viewportWidth?: number
  collapseAt?: string | number
  reverse?: boolean
  style?: Record<string, any>
}
