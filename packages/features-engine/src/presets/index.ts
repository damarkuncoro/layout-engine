import { Features } from "../features/Features.js"
import type { FeaturesProps } from "../contracts.js"

// 1. Simple Grid Preset
export function FeaturesGridPreset(props: FeaturesProps) {
  return Features({ pattern: "grid", ...props })
}

// 2. Feature Cards Preset
export function FeaturesCardsPreset(props: FeaturesProps) {
  return Features({ pattern: "cards", columns: 3, ...props })
}

// 3. Side-by-side (Alternating) Preset
export function FeaturesSplitPreset(props: FeaturesProps) {
  return Features({ pattern: "split", ...props })
}

// 4. Feature List Preset
export function FeaturesListPreset(props: FeaturesProps) {
  return Features({ pattern: "list", ...props })
}
