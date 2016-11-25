'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _default = require('../style/themes/default');

var _default2 = _interopRequireDefault(_default);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var __assign = undefined && undefined.__assign || Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) {
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
    }
    return t;
};

var Button = function (_React$Component) {
    (0, _inherits3["default"])(Button, _React$Component);

    function Button(props) {
        (0, _classCallCheck3["default"])(this, Button);

        var _this = (0, _possibleConstructorReturn3["default"])(this, _React$Component.call(this, props));

        _this.onPressIn = function () {
            for (var _len = arguments.length, arg = Array(_len), _key = 0; _key < _len; _key++) {
                arg[_key] = arguments[_key];
            }

            if (!_this.props.disabled) {
                _this.setState({ pressIn: true });
            }
            if (_this.props.onPressIn) {
                _this.props.onPressIn(arg);
            }
        };
        _this.onPressOut = function () {
            for (var _len2 = arguments.length, arg = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                arg[_key2] = arguments[_key2];
            }

            if (!_this.props.disabled) {
                _this.setState({ pressIn: false });
            }
            if (_this.props.onPressOut) {
                _this.props.onPressOut(arg);
            }
        };
        _this.onShowUnderlay = function () {
            for (var _len3 = arguments.length, arg = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                arg[_key3] = arguments[_key3];
            }

            if (!_this.props.disabled) {
                _this.setState({ touchIt: true });
            }
            if (_this.props.onShowUnderlay) {
                _this.props.onShowUnderlay(arg);
            }
        };
        _this.onHideUnderlay = function () {
            for (var _len4 = arguments.length, arg = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                arg[_key4] = arguments[_key4];
            }

            if (!_this.props.disabled) {
                _this.setState({ touchIt: false });
            }
            if (_this.props.onHideUnderlay) {
                _this.props.onHideUnderlay(arg);
            }
        };
        _this.state = {
            pressIn: false,
            touchIt: false
        };
        return _this;
    }

    Button.prototype.render = function render() {
        var _this2 = this;

        var _props = this.props,
            size = _props.size,
            type = _props.type,
            disabled = _props.disabled,
            activeStyle = _props.activeStyle;

        var height = void 0;
        var fontSize = void 0;
        var paddingLeft = void 0;
        var paddingRight = void 0;
        var backgroundColor = void 0;
        var textColor = void 0;
        var borderColor = void 0;
        var highlightBackgroundColor = void 0;
        var highlightTextColor = void 0;
        var highlightBorderColor = void 0;
        switch (size) {
            case 'large':
                height = _default2["default"].button_height;
                fontSize = _default2["default"].button_font_size;
                paddingLeft = paddingRight = _default2["default"].h_spacing_sm;
                break;
            case 'small':
                height = _default2["default"].button_height_sm;
                fontSize = _default2["default"].button_font_size_sm;
                paddingLeft = paddingRight = _default2["default"].h_spacing_sm;
                break;
            default:
                break;
        }
        if (type === 'primary') {
            textColor = _default2["default"].color_text_base_inverse;
            backgroundColor = _default2["default"].primary_button_fill;
            borderColor = _default2["default"].primary_button_fill;
            highlightTextColor = _default2["default"].color_text_base_inverse;
            highlightBackgroundColor = _default2["default"].primary_button_fill_tap;
            highlightBorderColor = _default2["default"].primary_button_fill;
        } else if (type === 'ghost') {
            textColor = _default2["default"].ghost_button_color;
            backgroundColor = 'transparent';
            borderColor = _default2["default"].ghost_button_color;
            highlightTextColor = _default2["default"].color_text_base_inverse;
            highlightBackgroundColor = _default2["default"].ghost_button_fill_tap;
            highlightBorderColor = _default2["default"].ghost_button_color;
        } else if (type === 'warning') {
            textColor = _default2["default"].brand_warning;
            backgroundColor = _default2["default"].fill_base;
            borderColor = _default2["default"].brand_warning;
            highlightTextColor = _default2["default"].color_text_base_inverse;
            highlightBackgroundColor = _default2["default"].brand_warning;
            highlightBorderColor = _default2["default"].brand_warning;
        } else {
            textColor = _default2["default"].color_text_base;
            backgroundColor = _default2["default"].fill_base;
            borderColor = _default2["default"].border_color_base;
            highlightTextColor = textColor;
            highlightBackgroundColor = _default2["default"].fill_tap;
            highlightBorderColor = _default2["default"].border_color_base;
        }
        if (disabled) {
            textColor = _default2["default"].color_text_disabled;
            backgroundColor = _default2["default"].fill_disabled;
            borderColor = _default2["default"].fill_disabled;
        }
        var textStyle = [{
            fontSize: fontSize,
            color: this.state.pressIn ? highlightTextColor : textColor
        }];
        var wrapperStyle = [{
            alignItems: 'center',
            height: height,
            paddingLeft: paddingLeft,
            paddingRight: paddingRight,
            backgroundColor: backgroundColor,
            borderRadius: _default2["default"].radius_md,
            borderWidth: 1,
            borderColor: borderColor,
            justifyContent: 'center'
        }, {
            borderColor: this.state.pressIn ? highlightBorderColor : borderColor
        }];
        var unProp = {};
        unProp.underlayColor = activeStyle ? highlightBackgroundColor : backgroundColor;
        if (activeStyle && this.state.touchIt) {
            wrapperStyle.push(activeStyle);
        }
        wrapperStyle.push(this.props.style);
        var newChild = _react2["default"].createElement(_reactNative.Text, { style: textStyle }, this.props.children);
        if (disabled) {
            return _react2["default"].createElement(_reactNative.View, __assign({}, this.props, { style: wrapperStyle }), newChild);
        }
        return _react2["default"].createElement(_reactNative.TouchableHighlight, __assign({ activeOpacity: 1, delayPressOut: 1 }, this.props, unProp, { style: wrapperStyle, onPress: function onPress(e) {
                return _this2.props.onClick && _this2.props.onClick(e);
            }, onPressIn: this.onPressIn, onPressOut: this.onPressOut, onShowUnderlay: this.onShowUnderlay, onHideUnderlay: this.onHideUnderlay }), newChild);
    };

    return Button;
}(_react2["default"].Component);

exports["default"] = Button;

Button.defaultProps = {
    pressIn: false,
    size: 'large',
    disabled: false,
    inline: false,
    loading: false,
    activeStyle: {},
    onClick: function onClick(_x) {},
    onPressIn: function onPressIn(_x) {},
    onPressOut: function onPressOut(_x) {},
    onShowUnderlay: function onShowUnderlay(_x) {},
    onHideUnderlay: function onHideUnderlay(_x) {}
};
module.exports = exports['default'];