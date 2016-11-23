/// <reference types="react" />
/// <reference types="react-native" />
import React from 'react';
export interface SearchBarProps {
    value?: string;
    placeholder?: string;
    onSubmit?: Function;
    onChange?: Function;
    onFocus?: () => void;
    onBlur?: () => void;
    onCancel?: Function;
    showCancelButton?: boolean;
    cancelText?: string;
    styles?: any;
    /** web only */
    prefixCls?: string;
    style?: React.CSSProperties;
    className?: string;
    disabled?: boolean;
    onClear?: Function;
}
export interface SearchBarState {
    value?: string;
    focus?: boolean;
}
export declare const defaultProps: {
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
