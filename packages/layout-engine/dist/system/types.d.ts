/**
 * Tipe panjang CSS. Angka akan dinormalisasi ke 'px' oleh resolver.
 */
export type CSSLength = number | string;
/**
 * Responsive value that adapts based on viewport width.
 */
export type ResponsiveValue<T> = T | {
    base?: T;
    sm?: T;
    md?: T;
    lg?: T;
    xl?: T;
    "2xl"?: T;
} | T[];
/**
 * Props dasar untuk layout primitives.
 * Hanya properti yang dipetakan ke style inline.
 */
export interface LayoutProps {
    padding?: CSSLength;
    margin?: CSSLength;
    width?: CSSLength;
    height?: CSSLength;
    display?: string;
    style?: Record<string, any>;
}
/**
 * Representasi node headless untuk renderer.
 */
export interface HeadlessNode {
    type: string;
    props: {
        style?: Record<string, any>;
        children?: any;
        [key: string]: any;
    };
}
