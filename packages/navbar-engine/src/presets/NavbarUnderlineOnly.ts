import type { NavbarProps } from "../contracts.js"
import { Navbar } from "../navbar/Navbar.js"
import { NAVBAR_DEFAULTS } from "../constants/defaults.js"

export function NavbarUnderlineOnly(props: NavbarProps) {
  return Navbar({
    variant: "transparent",
    elevation: false,
    border: true,
    contentPadding: NAVBAR_DEFAULTS.CONTENT_PADDING,
    barPadding: NAVBAR_DEFAULTS.BAR_PADDING,
    ...props
  })
}
