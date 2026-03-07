export type BreakpointKey = "sm" | "md" | "lg" | "xl" | "2xl";
export declare const breakpoints: Record<BreakpointKey, number>;
export type ResponsiveValue<T> = T | {
    base?: T;
    sm?: T;
    md?: T;
    lg?: T;
    xl?: T;
    "2xl"?: T;
} | T[];
export declare const resolveResponsive: <T>(value: ResponsiveValue<T> | undefined, width: number) => T | undefined;
