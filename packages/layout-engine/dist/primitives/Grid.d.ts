import type { CSSLength, LayoutProps } from "../system/types.js";
export interface GridProps extends LayoutProps {
    columns?: number | string;
    rows?: number | string;
    gap?: CSSLength;
}
export declare function Grid({ children, columns, rows, gap, padding, margin, width, height, display, style, ...rest }: GridProps & {
    children?: any;
}): {
    type: string;
    props: {
        children: any;
        style: Record<string, any>;
    };
};
