/// <reference types="react" />
import React from 'react';
import InputItemProps from './PropsType';
export default class InputItem extends React.Component<InputItemProps, any> {
    static defaultProps: {
        prefixCls: string;
        prefixListCls: string;
        type: string;
        editable: boolean;
        name: string;
        value: string;
        placeholder: string;
        clear: boolean;
        maxLength: number;
        onChange: any;
        onBlur: any;
        onFocus: any;
        extra: string;
        onExtraPress: any;
        error: boolean;
        onErrorPress: any;
        size: string;
        labelNumber: number;
        labelPosition: string;
        textAlign: string;
        last: boolean;
    };
    constructor(props: any);
    onChange: (text: any) => void;
    render(): JSX.Element;
}
