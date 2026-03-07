import { normalizeUnit } from "../core/styleResolver.js";
/**
 * Kontainer fleksibel berbasis style inline (tanpa dependency React).
 * Menghasilkan struktur objek yang merepresentasikan node 'div' dengan style flex.
 */
export function Flex({ children, justify, align, gap, direction = "row", padding, margin, width, height, display, style, ...rest }) {
    const resolved = {
        padding: normalizeUnit(padding),
        margin: normalizeUnit(margin),
        width: normalizeUnit(width),
        height: normalizeUnit(height),
        display: display !== null && display !== void 0 ? display : "flex",
        justifyContent: justify,
        alignItems: align,
        gap: normalizeUnit(gap),
        flexDirection: direction,
        ...style
    };
    return {
        type: "div",
        props: {
            style: resolved,
            ...rest,
            children
        }
    };
}
