import { normalizeUnit } from "../core/styleResolver.js";
/**
 * Komponen blok dasar yang memetakan LayoutProps → inline style.
 * Gunakan untuk membangun primitive lainnya.
 */
export function Box({ children, padding, margin, width, height, display, style, ...rest }) {
    const resolved = {
        padding: normalizeUnit(padding),
        margin: normalizeUnit(margin),
        width: normalizeUnit(width),
        height: normalizeUnit(height),
        display,
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
