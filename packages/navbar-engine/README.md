# @damarkuncoro/navbar-engine

Headless navbar engine with slots and variants. Paket ini dirancang untuk memudahkan pembuatan navigasi tingkat lanjut dengan fleksibilitas tata letak penuh.

## Instalasi

```bash
npm install @damarkuncoro/navbar-engine
```

**Kebutuhan**: Bergantung pada `@damarkuncoro/layout-engine`.

## Fitur Unggulan
- **Slot Architecture**: Gunakan slot `left`, `center`, dan `right` untuk kontrol konten penuh.
- **Headless UI**: Memberikan struktur node tanpa opini gaya yang mengikat, memudahkan integrasi dengan React, Vue, atau Svelte.
- **Scroll-Aware**: Logika bawaan untuk fitur `sticky`, `shrinkOnScroll`, dan `solidOnScroll`.
- **Responsive Mobile Menu**: Panel menu seluler otomatis yang diatur melalui state eksternal.
- **Ready-to-use Presets**: Dilengkapi dengan preset modern seperti `NavbarGlassBlur`, `NavbarModern`, `NavbarFloating`, dll.

## Penggunaan Dasar

### Menggunakan Primitif Navbar

```js
import { Navbar } from "@damarkuncoro/navbar-engine"

const myNav = Navbar({
  left: "MyLogo",
  center: ["Home", "About", "Contact"],
  right: "Login",
  height: 64,
  position: "sticky",
  variant: "light",
  elevation: true,
  border: true
})
```

### Menggunakan Presets Modern

```js
import { NavbarModern, NavbarGlassBlur } from "@damarkuncoro/navbar-engine"

// Navbar dengan efek glassmorphism yang cantik
const glassNav = NavbarGlassBlur({
  left: "Brand",
  center: ["Pricing", "Docs"],
  right: "Get Started"
})
```

## Modular Components
Paket ini memungkinkan Anda mengimpor komponen spesifik untuk kustomisasi lebih dalam:
```js
import { NavbarMainBar, NavbarMobilePanel, getBgForVariant } from "@damarkuncoro/navbar-engine"
```

## Struktur Paket
- **ESM (Recommended)**: `import { ... } from "@damarkuncoro/navbar-engine"`
- **CJS**: `const { ... } = require("@damarkuncoro/navbar-engine")`

## Lisensi
MIT
