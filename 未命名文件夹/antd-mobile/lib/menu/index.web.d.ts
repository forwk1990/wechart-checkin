/// <reference types="react" />
import React from 'react';
import { MenuProps, MenuState } from './PropsType';
export default class Menu extends React.Component<MenuProps, MenuState> {
    static defaultProps: {
        prefixCls: string;
        value: never[];
        data: never[];
        level: number;
        onChange: () => void;
    };
    constructor(props: any);
    onClickListItem: (el: any) => void;
    onClickSubMenuItem: (el: any) => void;
    render(): JSX.Element;
}
