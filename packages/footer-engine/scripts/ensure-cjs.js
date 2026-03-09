import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
const here = dirname(fileURLToPath(import.meta.url))
const target = resolve(here, "../lib/cjs/package.json")
mkdirSync(dirname(target), { recursive: true })
writeFileSync(target, JSON.stringify({ type: "commonjs" }, null, 2), "utf8")
