/// <reference types="react" />
import React from 'react';
import { SubMenuProps, SubMenuState } from './PropsType';
export default class SubMenu extends React.Component<SubMenuProps, SubMenuState> {
    static defaultProps: {
        prefixCls: string;
        radioPrefixCls: string;
        value: never[];
        data: never[];
        onChange: () => void;
    };
    constructor(props: any);
    componentWillReceiveProps(nextProps: any): void;
    onClick: (el: any) => void;
    render(): JSX.Element;
}
