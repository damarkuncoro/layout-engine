# @damarkuncoro/layout-engine

Minimal headless layout engine primitives and resolvers. Berfokus pada primitives (Box, Flex, Stack, Grid) dan structures (SidebarLayout, SplitLayout, dll) dengan sistem responsive yang cerdas.

## Instalasi

```bash
npm install @damarkuncoro/layout-engine
```

## Fitur Unggulan
- **Headless Architecture**: Menghasilkan struktur node murni yang mudah dirender ke HTML string, React components, atau adaptor UI lainnya.
- **Primitives**: Box, Flex, Stack, Grid, Spacer, Center, Container.
- **Advanced Structures**: SidebarLayout, SplitLayout, HeaderLayout, HeaderContentFooter.
- **Responsive System**: Sistem breakpoints bawaan (sm, md, lg, xl, 2xl) yang bisa di-resolve secara dinamis.
- **Theme Support**: Token warna, tipografi, spacing, dan shadow yang konsisten.

## Penggunaan Dasar

### Render Headless ke HTML String

```js
import { Box, Stack, SidebarLayout, renderToString } from "@damarkuncoro/layout-engine"

const page = SidebarLayout({
  sidebar: Box({ children: "Sidebar Content" }),
  children: Stack({ 
    gap: 16, 
    children: [
      Box({ children: "Card 1" }), 
      Box({ children: "Card 2" })
    ] 
  }),
  sidebarWidth: { base: "100%", md: 240 },
  viewportWidth: 1024 // Simulasi lebar layar
})

console.log(renderToString(page))
```

### Resolusi Nilai Responsif

```js
import { resolveResponsive } from "@damarkuncoro/layout-engine"

// Mengambil nilai berdasarkan lebar viewport (misal: 768px)
const gap = resolveResponsive({ base: 8, md: 16, xl: 24 }, 768) // Hasil: 16
```

## Struktur Paket
- **ESM (Recommended)**: `import { ... } from "@damarkuncoro/layout-engine"`
- **CJS**: `const { ... } = require("@damarkuncoro/layout-engine")`

## TypeScript
Paket ini ditulis sepenuhnya dalam TypeScript. Deklarasi tipe tersedia secara otomatis saat Anda menginstal paket ini.

## Lisensi
MIT
