import type { CSSLength, LayoutProps } from "../system/types.js";
export interface StackProps extends LayoutProps {
    gap?: CSSLength;
}
export declare function Stack({ children, gap, padding, margin, width, height, display, style, ...rest }: StackProps & {
    children?: any;
}): {
    type: string;
    props: {
        children: any;
        style: Record<string, any>;
    };
};
