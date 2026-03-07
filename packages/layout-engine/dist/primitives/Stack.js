import { normalizeUnit } from "../core/styleResolver.js";
export function Stack({ children, gap = 8, padding, margin, width, height, display, style, ...rest }) {
    const resolved = {
        padding: normalizeUnit(padding),
        margin: normalizeUnit(margin),
        width: normalizeUnit(width),
        height: normalizeUnit(height),
        display: display !== null && display !== void 0 ? display : "flex",
        flexDirection: "column",
        gap: normalizeUnit(gap),
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
