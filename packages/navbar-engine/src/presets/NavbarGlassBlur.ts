import type { NavbarProps } from "../contracts.js"
import { Navbar } from "../navbar/Navbar.js"
import { NAVBAR_DEFAULTS } from "../constants/defaults.js"

export function NavbarGlassBlur(props: NavbarProps) {
  return Navbar({
    variant: "transparent",
    elevation: false,
    border: true,
    contentPadding: NAVBAR_DEFAULTS.CONTENT_PADDING,
    barPadding: NAVBAR_DEFAULTS.GLASS_PADDING_Y,
    style: {
      backdropFilter: `${NAVBAR_DEFAULTS.SATURATE_AMOUNT} ${NAVBAR_DEFAULTS.BLUR_AMOUNT}`,
      WebkitBackdropFilter: `${NAVBAR_DEFAULTS.SATURATE_AMOUNT} ${NAVBAR_DEFAULTS.BLUR_AMOUNT}`,
      backgroundColor: NAVBAR_DEFAULTS.GLASS_BG
    },
    ...props
  })
}
