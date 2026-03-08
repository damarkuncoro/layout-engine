import type { NavbarProps } from "../contracts.js"
import { Navbar } from "../navbar/Navbar.js"
import { NAVBAR_DEFAULTS } from "../constants/defaults.js"

export function NavbarCenteredBrand(props: NavbarProps) {
  const {
    left,
    center,
    right,
    height = NAVBAR_DEFAULTS.HEIGHT,
    position = "sticky",
    top = 0,
    variant = "light",
    background,
    elevation = false,
    border = false,
    contained = true,
    style
  } = props
  return Navbar({
    left: left ?? null,
    center,
    right: right ?? null,
    height,
    position,
    top,
    variant,
    background,
    elevation,
    border,
    contained,
    centerAbsolute: true,
    contentPadding: NAVBAR_DEFAULTS.CONTENT_PADDING,
    barPadding: NAVBAR_DEFAULTS.BAR_PADDING,
    style: {
      ...style,
      position
    }
  })
}
