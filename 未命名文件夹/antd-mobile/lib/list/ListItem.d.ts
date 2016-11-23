/// <reference types="react" />
import React from 'react';
import { ListItemProps } from './PropsType';
export default class Item extends React.Component<ListItemProps, any> {
    static defaultProps: {
        last: boolean;
        multipleLine: boolean;
    };
    static Brief: any;
    timer: any;
    render(): JSX.Element;
}
