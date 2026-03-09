import { CSSLength } from "@damarkuncoro/layout-engine"

export type HeroPattern = "split" | "centered" | "fullscreen" | "overlap" | "minimal" | "custom"

export interface HeroAction {
  id?: string
  label: string
  href?: string
  onClick?: (e?: any) => void
  variant?: "primary" | "secondary" | "outline" | "ghost"
  icon?: any
}

export interface HeroStat {
  label: string
  value: string
  icon?: any
}

export interface HeroProps {
  pattern?: HeroPattern
  title?: any
  description?: any
  actions?: HeroAction[]
  visual?: any
  stats?: HeroStat[]
  form?: any
  video?: string
  height?: CSSLength
  minHeight?: CSSLength
  maxHeight?: CSSLength
  background?: string
  paddingY?: CSSLength
  paddingX?: CSSLength
  viewportWidth?: number
  collapseAt?: string | number
  reverse?: boolean
  visualOverlay?: string | number
  style?: Record<string, any>
  children?: any
}

// Sub-component contracts
export interface HeroTitleProps {
  children: any
  tag?: string
  style?: Record<string, any>
}

export interface HeroDescriptionProps {
  children: any
  style?: Record<string, any>
}

export interface HeroActionsProps {
  items: HeroAction[]
  justify?: string
  style?: Record<string, any>
}

export interface HeroVisualProps {
  children: any
  style?: Record<string, any>
}

export interface HeroBackgroundProps {
  image?: string
  video?: string
  overlay?: string | number
  style?: Record<string, any>
}

export interface HeroStatsProps {
  items: HeroStat[]
  style?: Record<string, any>
}

export interface HeroFormProps {
  children: any
  onSubmit?: (e: any) => void
  style?: Record<string, any>
}

export interface HeroGridProps {
  children: any
  columns?: number | string
  gap?: CSSLength
  style?: Record<string, any>
}
