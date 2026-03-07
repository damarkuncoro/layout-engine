import { normalizeUnit } from "../core/styleResolver.js";
const toTemplate = (v) => {
    if (typeof v === "number")
        return `repeat(${v}, minmax(0, 1fr))`;
    return v;
};
export function Grid({ children, columns, rows, gap, padding, margin, width, height, display, style, ...rest }) {
    const resolved = {
        padding: normalizeUnit(padding),
        margin: normalizeUnit(margin),
        width: normalizeUnit(width),
        height: normalizeUnit(height),
        display: display !== null && display !== void 0 ? display : "grid",
        gridTemplateColumns: toTemplate(columns),
        gridTemplateRows: toTemplate(rows),
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
