# Landing Page Example

Contoh landing page menggunakan layout-engine-react dengan Vite.

## Cara Menjalankan

```bash
# Install dependencies
cd examples/landing-page
npm install

# Build packages (jika belum)
cd ../packages/layout-engine && npm install && npm run build
cd ../layout-engine-react && npm install && npm run build

# Run dev server
cd ../landing-page
npm run dev
```

## Struktur

```
landing-page/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   └── main.jsx
└── landing-page.jsx   # Utama component
```

## Fitur

- Navbar dengan logo, links, dan CTA
- Hero section dengan headline dan buttons
- Features grid (6 cards)
- Pricing section (3 cards)
- Footer dengan 4-column links

## Dependencies

- react ^18.3.1
- react-dom ^18.3.1
- @damarkuncoro/layout-engine-react
- @vitejs/plugin-react ^4.3.4
- vite ^6.0.0