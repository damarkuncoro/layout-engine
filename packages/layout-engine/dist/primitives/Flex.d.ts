import type { LayoutProps, CSSLength } from "../system/types.js";
export interface FlexProps extends LayoutProps {
    justify?: string;
    align?: string;
    gap?: CSSLength;
    direction?: "row" | "row-reverse" | "column" | "column-reverse";
}
/**
 * Kontainer fleksibel berbasis style inline (tanpa dependency React).
 * Menghasilkan struktur objek yang merepresentasikan node 'div' dengan style flex.
 */
export declare function Flex({ children, justify, align, gap, direction, padding, margin, width, height, display, style, ...rest }: FlexProps & {
    children?: any;
}): {
    type: string;
    props: {
        children: any;
        style: Record<string, any>;
    };
};
