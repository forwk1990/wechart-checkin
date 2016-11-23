'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = exports.Brief = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _getDataAttr = require('../_util/getDataAttr');

var _getDataAttr2 = _interopRequireDefault(_getDataAttr);

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

var Brief = exports.Brief = function (_React$Component) {
    (0, _inherits3["default"])(Brief, _React$Component);

    function Brief() {
        (0, _classCallCheck3["default"])(this, Brief);
        return (0, _possibleConstructorReturn3["default"])(this, _React$Component.apply(this, arguments));
    }

    Brief.prototype.render = function render() {
        return _react2["default"].createElement("div", { className: "am-list-brief", style: this.props.style }, this.props.children);
    };

    return Brief;
}(_react2["default"].Component);

var ListItem = function (_React$Component2) {
    (0, _inherits3["default"])(ListItem, _React$Component2);

    function ListItem(props) {
        (0, _classCallCheck3["default"])(this, ListItem);

        var _this2 = (0, _possibleConstructorReturn3["default"])(this, _React$Component2.call(this, props));

        _this2.onClick = function (e) {
            if (_this2.props.onClick) {
                _this2.props.onClick(e);
            }
        };
        _this2.onTouchStart = function () {
            if (_this2.props.onClick) {
                _this2.setState({
                    hover: true
                });
            }
        };
        _this2.onTouchEnd = function () {
            if (_this2.props.onClick) {
                _this2.setState({
                    hover: false
                });
            }
        };
        _this2.state = {
            hover: false
        };
        return _this2;
    }

    ListItem.prototype.render = function render() {
        var _classNames, _classNames2, _classNames3;

        var _props = this.props,
            prefixCls = _props.prefixCls,
            thumb = _props.thumb,
            arrow = _props.arrow,
            error = _props.error,
            children = _props.children,
            extra = _props.extra,
            className = _props.className,
            align = _props.align,
            multipleLine = _props.multipleLine,
            wrap = _props.wrap,
            style = _props.style;
        var hover = this.state.hover;

        var thumbDom = void 0;
        var arrowDom = void 0;
        var wrapCls = (0, _classnames2["default"])((_classNames = {}, (0, _defineProperty3["default"])(_classNames, prefixCls + '-item', true), (0, _defineProperty3["default"])(_classNames, prefixCls + '-item-error', error), (0, _defineProperty3["default"])(_classNames, prefixCls + '-item-top', align === 'top'), (0, _defineProperty3["default"])(_classNames, prefixCls + '-item-middle', align === 'middle'), (0, _defineProperty3["default"])(_classNames, prefixCls + '-item-bottom', align === 'bottom'), (0, _defineProperty3["default"])(_classNames, prefixCls + '-item-hover', hover), (0, _defineProperty3["default"])(_classNames, className, className), _classNames));
        var lineCls = (0, _classnames2["default"])((_classNames2 = {}, (0, _defineProperty3["default"])(_classNames2, prefixCls + '-line', true), (0, _defineProperty3["default"])(_classNames2, prefixCls + '-line-multiple', multipleLine), (0, _defineProperty3["default"])(_classNames2, prefixCls + '-line-wrap', wrap), _classNames2));
        var arrowCls = (0, _classnames2["default"])((_classNames3 = {}, (0, _defineProperty3["default"])(_classNames3, prefixCls + '-arrow', true), (0, _defineProperty3["default"])(_classNames3, prefixCls + '-arrow-horizontal', arrow === 'horizontal'), (0, _defineProperty3["default"])(_classNames3, prefixCls + '-arrow-vertical', arrow === 'down' || arrow === 'up'), (0, _defineProperty3["default"])(_classNames3, prefixCls + '-arrow-vertical-up', arrow === 'up'), _classNames3));
        if (thumb) {
            if (typeof thumb === 'string') {
                thumbDom = _react2["default"].createElement("div", { className: prefixCls + '-thumb' }, _react2["default"].createElement("img", { src: thumb }));
            } else {
                thumbDom = _react2["default"].createElement("div", { className: prefixCls + '-thumb' }, thumb);
            }
        }
        /* arrow有值，则保留这个dom坑位 */
        if (arrow !== '') {
            arrowDom = _react2["default"].createElement("div", { className: arrowCls });
        } else {
            arrowDom = null;
        }
        return _react2["default"].createElement("div", __assign({}, (0, _getDataAttr2["default"])(this.props), { className: wrapCls, onClick: this.onClick, onTouchStart: this.onTouchStart, onTouchEnd: this.onTouchEnd, onTouchCancel: this.onTouchEnd, style: style }), thumbDom, _react2["default"].createElement("div", { className: lineCls }, children !== '' ? _react2["default"].createElement("div", { className: prefixCls + '-content' }, children) : null, extra !== '' ? _react2["default"].createElement("div", { className: prefixCls + '-extra' }, extra) : null, arrowDom));
    };

    return ListItem;
}(_react2["default"].Component);

exports["default"] = ListItem;

ListItem.Brief = Brief;
ListItem.defaultProps = {
    prefixCls: 'am-list',
    thumb: '',
    arrow: '',
    children: '',
    extra: '',
    error: false,
    multipleLine: false,
    align: 'middle',
    wrap: false
};
// 给其他组件对其设置 extra 使用
ListItem.myName = 'ListItem';