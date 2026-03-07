const styleToString = (style) => {
    if (!style)
        return "";
    const entries = Object.entries(style)
        .filter(([_, v]) => v !== undefined && v !== null && v !== "")
        .map(([k, v]) => {
        const prop = k.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
        return `${prop}:${String(v)}`;
    });
    return entries.join(";");
};
const escapeHtml = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const renderChild = (child) => {
    if (child === null || child === undefined || child === false)
        return "";
    if (Array.isArray(child))
        return child.map(renderChild).join("");
    if (typeof child === "object" && child.type && child.props) {
        return renderToString(child);
    }
    return escapeHtml(String(child));
};
/**
 * Merender HeadlessNode menjadi string HTML dengan inline style.
 */
export const renderToString = (node) => {
    const { type, props } = node;
    const { children, style, className, ...rest } = props || {};
    const styleStr = styleToString(style);
    const attr = (className ? ` class="${className}"` : "") +
        (styleStr ? ` style="${styleStr}"` : "") +
        Object.entries(rest)
            .map(([k, v]) => {
            if (v === undefined || v === null || typeof v === "object")
                return "";
            return ` ${k}="${String(v)}"`;
        })
            .join("");
    const inner = renderChild(children);
    return `<${type}${attr}>${inner}</${type}>`;
};
