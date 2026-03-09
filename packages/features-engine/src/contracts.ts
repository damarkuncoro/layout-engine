import { CSSLength } from "@damarkuncoro/layout-engine"

export type FeaturesPattern = "grid" | "list" | "split" | "cards"

export interface FeatureItem {
  id: string
  title: string
  description: string
  icon?: any
  image?: string
  link?: { label: string; href: string }
}

export interface FeaturesProps {
  pattern?: FeaturesPattern
  title?: any
  subtitle?: any
  items: FeatureItem[]
  columns?: number | string
  background?: string
  color?: string
  paddingY?: CSSLength
  paddingX?: CSSLength
  contained?: boolean
  style?: Record<string, any>
  children?: any
}

// Sub-component contracts
export interface FeatureItemProps extends FeatureItem {
  pattern?: FeaturesPattern
  style?: Record<string, any>
}

export interface FeaturesHeaderProps {
  title?: any
  subtitle?: any
  align?: "left" | "center" | "right"
  style?: Record<string, any>
}
