/// <reference types="react" />
import React from 'react';
import PaginationProps from './PropsType';
export default class Pagination extends React.Component<PaginationProps, any> {
    static defaultProps: {
        prefixCls: string;
        mode: string;
        current: number;
        simple: boolean;
        prevText: string;
        nextText: string;
        onChange: () => void;
    };
    constructor(props: any);
    componentWillReceiveProps(nextProps: any): void;
    _hasPrev(): boolean;
    _hasNext(): boolean;
    _handleChange(p: any): any;
    onPrev(): void;
    onNext(): void;
    getIndexes(count: any): number[];
    render(): JSX.Element;
}
