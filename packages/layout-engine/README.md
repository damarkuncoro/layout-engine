# @damarkuncoro/layout-engine

Minimal headless layout engine primitives and resolvers. Berfokus pada primitives (Box, Flex, Stack, Grid) dan structures (SidebarLayout, SplitLayout, dll) dengan sistem responsive yang cerdas.

## Instalasi

```bash
npm install @damarkuncoro/layout-engine
```

## Fitur Unggulan
- **Headless Architecture**: Menghasilkan struktur node murni yang mudah dirender ke HTML string, React components, atau adaptor UI lainnya.
- **Semantic HTML**: Primitif (Box, Flex, dll) mendukung properti `tag` untuk merender elemen HTML semantik seperti `nav`, `section`, `ul`, `li`.
- **Primitives**: Box, Flex, Stack, Grid, Spacer, Center, Container.
- **Advanced Structures**: SidebarLayout, SplitLayout, HeaderLayout, HeaderContentFooter.
- **Responsive System**: Sistem breakpoints bawaan (sm, md, lg, xl, 2xl) yang bisa di-resolve secara dinamis.
- **Global Constants**: Konstanta layout terpusat untuk gap default, z-index, dan transisi demi konsistensi visual.
- **Theme Support**: Token warna, tipografi, spacing, dan shadow yang konsisten.

## Penggunaan Dasar

### Render Headless ke HTML String dengan Tag Semantik

```js
import { Box, Flex, renderToString } from "@damarkuncoro/layout-engine"

const nav = Flex({
  tag: "nav",
  children: [
    Box({ tag: "ul", style: { listStyle: "none" }, children: [
      Box({ tag: "li", children: "Home" }),
      Box({ tag: "li", children: "Docs" })
    ]})
  ]
})

console.log(renderToString(nav))
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
