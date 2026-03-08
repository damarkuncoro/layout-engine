# @damarkuncoro/hero-engine

Headless hero section engine with slots and layout patterns.

## Features

- **Slot Architecture**: Content slots for `title`, `description`, `actions`, and `visual` (image/video/3d).
- **Layout Patterns**: Pre-built patterns like `split`, `centered`, `fullscreen`, and `overlap`.
- **Responsive**: Dynamic layout adjustments based on viewport size.
- **Headless**: Pure logic and structure, no forced styles.

## Installation

```bash
npm install @damarkuncoro/hero-engine
```

## Usage

```javascript
import { Hero } from "@damarkuncoro/hero-engine"

const myHero = Hero({
  pattern: "split",
  title: "Build faster with Headless UI",
  description: "A set of unstyled, fully accessible UI components.",
  actions: [
    { label: "Get Started", primary: true },
    { label: "View on GitHub" }
  ],
  visual: "/hero-image.png"
})
```

## License

MIT
