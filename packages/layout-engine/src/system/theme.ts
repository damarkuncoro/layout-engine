/**
 * Theme System untuk layout-engine
 * Menyediakan tokens untuk colors, typography, spacing, dan dark mode
 */

/**
 * Theme colors
 */
export interface ThemeColors {
  primary: string
  primaryHover: string
  primaryFg: string
  secondary: string
  secondaryHover: string
  secondaryFg: string
  bg: string
  bgSubtle: string
  bgMuted: string
  bgEmphasis: string
  fg: string
  fgMuted: string
  fgSubtle: string
  fgEmphasis: string
  border: string
  borderFocus: string
  success: string
  warning: string
  error: string
  info: string
}

/**
 * Theme typography
 */
export interface ThemeTypography {
  fontSans: string
  fontMono: string
  textXs: string
  textSm: string
  textBase: string
  textLg: string
  textXl: string
  text2xl: string
  text3xl: string
  text4xl: string
  fontNormal: number
  fontMedium: number
  fontSemibold: number
  fontBold: number
  leadingTight: number
  leadingNormal: number
  leadingRelaxed: number
}

/**
 * Theme border radii
 */
export interface ThemeRadii {
  radiusNone: string
  radiusSm: string
  radiusBase: string
  radiusMd: string
  radiusLg: string
  radiusXl: string
  radiusFull: string
}

/**
 * Theme shadows
 */
export interface ThemeShadows {
  shadowSm: string
  shadowBase: string
  shadowMd: string
  shadowLg: string
  shadowXl: string
}

/**
 * Theme spacing (spacing tokens)
 */
export interface ThemeSpacing {
  space0: string
  space1: string
  space2: string
  space3: string
  space4: string
  space5: string
  space6: string
  space8: string
  space10: string
  space12: string
  space16: string
  space20: string
  space24: string
  space32: string
  space40: string
  space48: string
  space64: string
  space80: string
  space96: string
}

/**
 * Theme breakpoints
 */
export interface ThemeBreakpoints {
  bpSm: number
  bpMd: number
  bpLg: number
  bpXl: number
  bp2xl: number
}

/**
 * Complete theme type
 */
export interface Theme extends ThemeColors, ThemeTypography, ThemeRadii, ThemeShadows, ThemeSpacing, ThemeBreakpoints {}

/**
 * Light theme
 */
export const themeLight: Theme = {
  // Colors
  primary: "#3b82f6",
  primaryHover: "#2563eb",
  primaryFg: "#ffffff",
  secondary: "#64748b",
  secondaryHover: "#475569",
  secondaryFg: "#ffffff",
  bg: "#ffffff",
  bgSubtle: "#f8fafc",
  bgMuted: "#f1f5f9",
  bgEmphasis: "#f1f5f9",
  fg: "#0f172a",
  fgMuted: "#475569",
  fgSubtle: "#94a3b8",
  fgEmphasis: "#000000",
  border: "#e2e8f0",
  borderFocus: "#3b82f6",
  success: "#22c55e",
  warning: "#f59e0b",
  error: "#ef4444",
  info: "#3b82f6",
  
  // Typography
  fontSans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  fontMono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  textXs: "0.75rem",
  textSm: "0.875rem",
  textBase: "1rem",
  textLg: "1.125rem",
  textXl: "1.25rem",
  text2xl: "1.5rem",
  text3xl: "1.875rem",
  text4xl: "2.25rem",
  fontNormal: 400,
  fontMedium: 500,
  fontSemibold: 600,
  fontBold: 700,
  leadingTight: 1.25,
  leadingNormal: 1.5,
  leadingRelaxed: 1.625,
  
  // Radii
  radiusNone: "0",
  radiusSm: "0.125rem",
  radiusBase: "0.25rem",
  radiusMd: "0.375rem",
  radiusLg: "0.5rem",
  radiusXl: "0.75rem",
  radiusFull: "9999px",
  
  // Shadows
  shadowSm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  shadowBase: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  shadowMd: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  shadowLg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  shadowXl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  
  // Spacing
  space0: "0",
  space1: "0.25rem",
  space2: "0.5rem",
  space3: "0.75rem",
  space4: "1rem",
  space5: "1.25rem",
  space6: "1.5rem",
  space8: "2rem",
  space10: "2.5rem",
  space12: "3rem",
  space16: "4rem",
  space20: "5rem",
  space24: "6rem",
  space32: "8rem",
  space40: "10rem",
  space48: "12rem",
  space64: "16rem",
  space80: "20rem",
  space96: "24rem",
  
  // Breakpoints
  bpSm: 640,
  bpMd: 768,
  bpLg: 1024,
  bpXl: 1280,
  bp2xl: 1536,
}

/**
 * Dark theme
 */
export const themeDark: Theme = {
  // Colors
  primary: "#3b82f6",
  primaryHover: "#60a5fa",
  primaryFg: "#ffffff",
  secondary: "#64748b",
  secondaryHover: "#94a3b8",
  secondaryFg: "#ffffff",
  bg: "#0f172a",
  bgSubtle: "#1e293b",
  bgMuted: "#334155",
  bgEmphasis: "#111827",
  fg: "#f8fafc",
  fgMuted: "#cbd5e1",
  fgSubtle: "#64748b",
  fgEmphasis: "#ffffff",
  border: "#334155",
  borderFocus: "#3b82f6",
  success: "#22c55e",
  warning: "#f59e0b",
  error: "#ef4444",
  info: "#3b82f6",
  
  // Typography
  fontSans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  fontMono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  textXs: "0.75rem",
  textSm: "0.875rem",
  textBase: "1rem",
  textLg: "1.125rem",
  textXl: "1.25rem",
  text2xl: "1.5rem",
  text3xl: "1.875rem",
  text4xl: "2.25rem",
  fontNormal: 400,
  fontMedium: 500,
  fontSemibold: 600,
  fontBold: 700,
  leadingTight: 1.25,
  leadingNormal: 1.5,
  leadingRelaxed: 1.625,
  
  // Radii
  radiusNone: "0",
  radiusSm: "0.125rem",
  radiusBase: "0.25rem",
  radiusMd: "0.375rem",
  radiusLg: "0.5rem",
  radiusXl: "0.75rem",
  radiusFull: "9999px",
  
  // Shadows - lebih terang untuk dark mode
  shadowSm: "0 1px 2px 0 rgb(0 0 0 / 0.3)",
  shadowBase: "0 1px 3px 0 rgb(0 0 0 / 0.4), 0 1px 2px -1px rgb(0 0 0 / 0.4)",
  shadowMd: "0 4px 6px -1px rgb(0 0 0 / 0.4), 0 2px 4px -2px rgb(0 0 0 / 0.4)",
  shadowLg: "0 10px 15px -3px rgb(0 0 0 / 0.4), 0 4px 6px -4px rgb(0 0 0 / 0.4)",
  shadowXl: "0 20px 25px -5px rgb(0 0 0 / 0.4), 0 8px 10px -6px rgb(0 0 0 / 0.4)",
  
  // Spacing
  space0: "0",
  space1: "0.25rem",
  space2: "0.5rem",
  space3: "0.75rem",
  space4: "1rem",
  space5: "1.25rem",
  space6: "1.5rem",
  space8: "2rem",
  space10: "2.5rem",
  space12: "3rem",
  space16: "4rem",
  space20: "5rem",
  space24: "6rem",
  space32: "8rem",
  space40: "10rem",
  space48: "12rem",
  space64: "16rem",
  space80: "20rem",
  space96: "24rem",
  
  // Breakpoints
  bpSm: 640,
  bpMd: 768,
  bpLg: 1024,
  bpXl: 1280,
  bp2xl: 1536,
}

/**
 * Default theme (light)
 */
export const theme = themeLight

/**
 * Color scheme type
 */
export type ColorScheme = "light" | "dark" | "system"

/**
 * Detect system color scheme preference
 */
export function getSystemColorScheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light"
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

/**
 * Get theme based on color scheme
 */
export function getTheme(colorScheme: ColorScheme = "system"): Theme {
  if (colorScheme === "system") {
    return getSystemColorScheme() === "dark" ? themeDark : themeLight
  }
  return colorScheme === "dark" ? themeDark : themeLight
}