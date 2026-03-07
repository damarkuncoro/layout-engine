import type { LayoutProps } from "../system/types.js";
export { type LayoutProps };
/**
 * Komponen blok dasar yang memetakan LayoutProps → inline style.
 * Gunakan untuk membangun primitive lainnya.
 */
export declare function Box({ children, padding, margin, width, height, display, style, ...rest }: LayoutProps & {
    children?: any;
}): {
    type: string;
    props: {
        children: any;
        style: Record<string, any>;
    };
};
