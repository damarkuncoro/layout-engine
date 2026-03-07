# layout-engine-react

Adaptor React untuk `layout-engine`. Mengubah headless nodes menjadi komponen React untuk dipakai di aplikasi.

## Instalasi

```bash
npm install @damarkuncoro/layout-engine-react
```

Pastikan `react` dan `react-dom` tersedia.

## Import ESM & CJS

- ESM (direkomendasikan):

```js
import { Box, Stack, SidebarLayout } from "@damarkuncoro/layout-engine-react"
```

- CJS:

```js
const { Box, Stack, SidebarLayout } = require("@damarkuncoro/layout-engine-react")
```

## Penggunaan

```jsx
import React from "react"
import { SidebarLayout, Stack, Box } from "@damarkuncoro/layout-engine-react"

export default function App() {
  const sidebar = Box({ children: "Sidebar" })
  const content = Stack({ gap: 16, children: [Box({ children: "Card 1" }), Box({ children: "Card 2" })] })
  return React.createElement(SidebarLayout, {
    sidebar,
    children: content,
    sidebarWidth: { base: 120, md: 200, xl: 280 }
  })
}
```

## Fitur
- Komponen: Box, Flex, Stack, Grid, SidebarLayout, DashboardLayout.
- Otomatisasi key untuk child React agar aman dari warning.
- ESM-only, tipe tersedia.
  - Output library tersedia di `lib/esm` (ESM) dan `lib/cjs` (CJS).

## Lisensi
MIT
