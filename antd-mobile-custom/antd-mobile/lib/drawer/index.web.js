'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = undefined;

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _rcDrawer = require('rc-drawer');

var _rcDrawer2 = _interopRequireDefault(_rcDrawer);

var _splitObject3 = require('../_util/splitObject');

var _splitObject4 = _interopRequireDefault(_splitObject3);

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

var Drawer = function (_React$Component) {
    (0, _inherits3["default"])(Drawer, _React$Component);

    function Drawer() {
        (0, _classCallCheck3["default"])(this, Drawer);
        return (0, _possibleConstructorReturn3["default"])(this, _React$Component.apply(this, arguments));
    }

    Drawer.prototype.render = function render() {
        var _splitObject = (0, _splitObject4["default"])(this.props, ['prefixCls', 'children']),
            _splitObject2 = (0, _slicedToArray3["default"])(_splitObject, 2),
            _splitObject2$ = _splitObject2[0],
            prefixCls = _splitObject2$.prefixCls,
            children = _splitObject2$.children,
            restProps = _splitObject2[1];

        return _react2["default"].createElement(_rcDrawer2["default"], __assign({ prefixCls: prefixCls }, restProps), children);
    };

    return Drawer;
}(_react2["default"].Component);

exports["default"] = Drawer;

Drawer.defaultProps = {
    prefixCls: 'am-drawer',
    enableDragHandle: false
};
module.exports = exports['default'];