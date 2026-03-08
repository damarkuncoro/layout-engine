import { Hero } from "../hero/Hero.js"
import type { HeroProps } from "../contracts.js"

export function HeroSplit(props: HeroProps) {
  return Hero({
    pattern: "split",
    ...props
  })
}

export function HeroCentered(props: HeroProps) {
  return Hero({
    pattern: "centered",
    ...props
  })
}

export function HeroBrutalist(props: HeroProps) {
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
