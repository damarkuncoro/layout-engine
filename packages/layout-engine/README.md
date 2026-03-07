# layout-engine

Headless layout engine berfokus pada primitives (Box, Flex, Stack, Grid) dan structures (SidebarLayout) dengan sistem responsive sederhana.

## Instalasi

```bash
npm install layout-engine
```

## Fitur
- Headless nodes → mudah dirender ke HTML string atau adaptor UI.
- Primitives: Box, Flex, Stack, Grid.
- Structures: SidebarLayout.
- Sistem responsive berbasis breakpoints (sm, md, lg, xl, 2xl).

## Penggunaan Dasar

Render headless ke HTML:

```js
import { Box, Flex, Stack, Grid, SidebarLayout, renderToString } from "layout-engine"

const page = SidebarLayout({
  sidebar: Box({ children: "Sidebar" }),
  children: Stack({ gap: 16, children: [Box({ children: "Card 1" }), Box({ children: "Card 2" })] }),
  sidebarWidth: { base: 120, md: 200, xl: 280 },
  viewportWidth: 1024
})

console.log(renderToString(page))
```

Responsive utility:

```js
import { resolveResponsive } from "layout-engine"
const gap = resolveResponsive({ base: 8, md: 16, xl: 24 }, 768) // 16
```

## TypeScript
- ESM-only, deklarasi tipe tersedia pada `dist/index.d.ts`.

## Lisensi
MIT
