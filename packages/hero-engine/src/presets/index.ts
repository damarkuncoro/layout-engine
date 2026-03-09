import { Hero } from "../hero/Hero.js"
import type { HeroProps } from "../contracts.js"

// 1. Centered Hero
export function HeroCenteredPreset(props: HeroProps) {
  return Hero({ pattern: "centered", ...props })
}

// 2. Split Hero (Default)
export function HeroSplitPreset(props: HeroProps) {
  return Hero({ pattern: "split", ...props })
}

// 3. Fullscreen Hero
export function HeroFullscreenPreset(props: HeroProps) {
  return Hero({ pattern: "fullscreen", ...props })
}

// 4. Background Image Hero
export function HeroBackgroundPreset(props: HeroProps) {
  return Hero({ 
    pattern: "fullscreen", 
    visualOverlay: props.visualOverlay ?? 0.5,
    ...props 
  })
}

// 5. Video Hero
export function HeroVideoPreset(props: HeroProps) {
  return Hero({
    pattern: "fullscreen",
    visualOverlay: props.visualOverlay ?? 0.5,
    ...props
  })
}

// 6. Product Showcase Hero
export function HeroProductPreset(props: HeroProps) {
  return Hero({ pattern: "split", ...props })
}

// 7. Minimal Hero
export function HeroMinimalPreset(props: HeroProps) {
  return Hero({ pattern: "minimal", ...props })
}

// 8. Hero with Form
export function HeroFormPreset(props: HeroProps) {
  return Hero({ pattern: "split", ...props })
}

// 9. Hero with Stats
export function HeroStatsPreset(props: HeroProps) {
  return Hero({ pattern: "split", ...props })
}

// 10. Illustration Hero
export function HeroIllustrationPreset(props: HeroProps) {
  return Hero({ pattern: "split", ...props })
}

// 11. Card Hero
export function HeroCardsPreset(props: HeroProps) {
  return Hero({ pattern: "centered", ...props })
}

// 12. App Preview Hero
export function HeroAppPreviewPreset(props: HeroProps) {
  return Hero({ pattern: "centered", ...props })
}

// Extra: Brutalist Preset
export function HeroBrutalistPreset(props: HeroProps) {
  return Hero({
    ...props,
    style: {
      border: "4px solid #000",
      boxShadow: "8px 8px 0px 0px #000",
      backgroundColor: "#fff",
      ...props.style
    }
  })
}
