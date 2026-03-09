import { CSSLength } from "@damarkuncoro/layout-engine"

export interface FooterLink {
  id?: string
  label: string
  href: string
}

export interface FooterSection {
  title: string
  links: FooterLink[]
}

export interface FooterSocial {
  id: string
  icon: any
  href: string
  label?: string
}

export interface FooterProps {
  logo?: any
  copyright?: string
  sections?: FooterSection[]
  socials?: FooterSocial[]
  bottomLinks?: FooterLink[]
  background?: string
  color?: string
  paddingY?: CSSLength
  paddingX?: CSSLength
  contained?: boolean
  style?: Record<string, any>
  children?: any
}

// Sub-component contracts
export interface FooterLinksProps {
  sections: FooterSection[]
  columns?: number
  style?: Record<string, any>
}

export interface FooterSocialsProps {
  items: FooterSocial[]
  style?: Record<string, any>
}

export interface FooterBottomProps {
  children: any
  style?: Record<string, any>
}
