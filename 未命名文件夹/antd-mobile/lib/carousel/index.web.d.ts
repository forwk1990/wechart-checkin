/// <reference types="react" />
import React from 'react';
export interface CarouselProps {
    selectedIndex?: number;
    dots?: boolean;
    vertical?: boolean;
    autoplay?: boolean;
    infinite?: boolean;
    children?: any;
    /** web only */
    prefixCls?: string;
    easing?: string;
    beforeChange?: (from: number, to: number) => void;
    afterChange?: (current: number) => void;
    style?: React.CSSProperties;
}
export default class Carousel extends React.Component<CarouselProps, any> {
    static defaultProps: {
        prefixCls: string;
        dots: boolean;
        arrows: boolean;
        autoplay: boolean;
        infinite: boolean;
        edgeEasing: string;
        cellAlign: string;
        selectedIndex: number;
    };
    constructor(props: any);
    onChange(index: any): void;
    render(): JSX.Element | null;
}
