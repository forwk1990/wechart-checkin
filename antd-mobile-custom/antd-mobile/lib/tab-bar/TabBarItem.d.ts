/// <reference types="react" />
import React from 'react';
export interface TabBarItemProps {
    badge?: string | number;
    onPress?: () => void;
    selected?: boolean;
    icon?: any;
    selectedIcon?: any;
    style?: any;
    children: any;
    title: string;
    tintColor?: string;
    unselectedTintColor?: string;
    systemIcon?: any;
    renderAsOriginal?: boolean;
    rootPrefixCls?: string;
    className?: string;
}
export default class TabBarItem extends React.Component<TabBarItemProps, any> {
    static defaultProps: {
        onPress(): void;
    };
    render(): JSX.Element;
}
