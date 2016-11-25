/// <reference types="react" />
import React from 'react';
import tsPropsType from './PropsType';
export default class Popover extends React.Component<tsPropsType, any> {
    static defaultProps: {
        prefixCls: string;
        placement: string;
        popupAlign: {
            overflow: {
                adjustY: number;
                adjustX: number;
            };
        };
        trigger: string[];
        onSelect: () => void;
    };
    static Item: React.ClassicComponentClass<{
        onTouchStart?: ((e: any) => void) | undefined;
        onTouchEnd?: ((e: any) => void) | undefined;
        onTouchCancel?: ((e: any) => void) | undefined;
        activeStyle?: any;
    } & {}>;
    render(): JSX.Element;
}
