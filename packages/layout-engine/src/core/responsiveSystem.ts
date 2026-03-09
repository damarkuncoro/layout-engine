export type BreakpointKey = "sm" | "md" | "lg" | "xl" | "2xl"

export const breakpoints: Record<BreakpointKey, number> = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536
}

export type ResponsiveValue<T> =
  | T
  | {
      base?: T
      sm?: T
      md?: T
      lg?: T
      xl?: T
      "2xl"?: T
    }
  | T[]

export const resolveResponsive = <T>(
  value: ResponsiveValue<T> | undefined,
  width: number
): T | undefined => {
  if (value === undefined || value === null) return value as any
  if (!Array.isArray(value) && typeof value !== "object") return value as T

  const order: Array<{ key?: BreakpointKey; min: number }> = [
    { min: 0 },
    { key: "sm", min: breakpoints.sm },
    { key: "md", min: breakpoints.md },
    { key: "lg", min: breakpoints.lg },
    { key: "xl", min: breakpoints.xl },
    { key: "2xl", min: breakpoints["2xl"] }
  ]

  let resolved: T | undefined = undefined

  if (Array.isArray(value)) {
    for (let i = 0; i < order.length; i++) {
      if (width >= order[i].min && i < value.length) {
        resolved = value[i] as T
      }
    }
    return resolved
  }

  const obj = value as Record<string, T>
  if (obj.base !== undefined) resolved = obj.base as T

  for (const it of order) {
    if (!it.key) continue
    if (width >= it.min && obj[it.key] !== undefined) {
      resolved = obj[it.key] as T
    }
  }
  return resolved
}

/**
 * Generates a style object with CSS variables for responsive values.
 * This allows the browser to handle responsiveness via media queries if the renderer supports it,
 * or at least reduces the number of re-renders by centralizing the values.
 */
export const getResponsiveStyles = (
  property: string,
  value: ResponsiveValue<any> | undefined,
  prefix: string = "le"
): { styles: Record<string, string>; variableName: string } => {
  if (value === undefined) return { styles: {}, variableName: "" }
  
  const varName = `--${prefix}-${property}`
  const styles: Record<string, string> = {}

  if (!Array.isArray(value) && typeof value !== "object") {
    styles[varName] = String(value)
    return { styles, variableName: varName }
  }

  if (Array.isArray(value)) {
    const keys: Array<string | undefined> = ["base", "sm", "md", "lg", "xl", "2xl"]
    value.forEach((v, i) => {
      if (v !== undefined && keys[i]) {
        styles[`${varName}-${keys[i]}`] = String(v)
      }
    })
  } else {
    const obj = value as Record<string, any>
    Object.entries(obj).forEach(([key, v]) => {
      styles[`${varName}-${key}`] = String(v)
    })
  }

  return { styles, variableName: `var(${varName}-base, var(${varName}))` }
}
