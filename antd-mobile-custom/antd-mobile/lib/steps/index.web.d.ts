/// <reference types="react" />
import React from 'react';
export interface StepsProps {
    prefixCls?: string;
    iconPrefix?: string;
    direction?: string;
    labelPlacement?: string;
    children: any;
    status?: string;
    size?: string;
    current?: number;
}
export default class Steps extends React.Component<StepsProps, any> {
    static Step: any;
    static defaultProps: {
        prefixCls: string;
        iconPrefix: string;
        labelPlacement: string;
        current: number;
        direction: string;
    };
    render(): JSX.Element;
}
