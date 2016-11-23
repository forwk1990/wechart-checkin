/// <reference types="react" />
/// <reference types="react-native" />
import React from 'react';
import { SearchBarProps, SearchBarState } from './PropsType';
export default class SearchBar extends React.Component<SearchBarProps, SearchBarState> {
    static defaultProps: {
        prefixCls: string;
        placeholder: string;
        onSubmit: () => void;
        onChange: () => void;
        onFocus: () => void;
        onBlur: () => void;
        onClear: () => void;
        showCancelButton: boolean;
        cancelText: string;
        disabled: boolean;
        styles: {
            input: React.ViewStyle;
            wrapper: React.ViewStyle;
            cancelTextContainer: React.ViewStyle;
            cancelText: React.ViewStyle;
            search: React.ViewStyle;
        };
    };
    constructor(props: any);
    componentWillReceiveProps(nextProps: any): void;
    onSubmit: (e: any) => void;
    onChangeText: (value: any) => void;
    onCancel: () => void;
    render(): JSX.Element;
}
