export const breakpoints = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536
};
export const resolveResponsive = (value, width) => {
    if (value === undefined)
        return undefined;
    if (!Array.isArray(value) && typeof value !== "object")
        return value;
    const order = [
        { min: 0 },
        { key: "sm", min: breakpoints.sm },
        { key: "md", min: breakpoints.md },
        { key: "lg", min: breakpoints.lg },
        { key: "xl", min: breakpoints.xl },
        { key: "2xl", min: breakpoints["2xl"] }
    ];
    let resolved = undefined;
    if (Array.isArray(value)) {
        for (let i = 0; i < order.length; i++) {
            if (width >= order[i].min && i < value.length) {
                resolved = value[i];
            }
        }
        return resolved;
    }
    const obj = value;
    if (obj.base !== undefined)
        resolved = obj.base;
    for (const it of order) {
        if (!it.key)
            continue;
        if (width >= it.min && obj[it.key] !== undefined) {
            resolved = obj[it.key];
        }
    }
    return resolved;
};
