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

var _rcTooltip = require('rc-tooltip');

var _rcTooltip2 = _interopRequireDefault(_rcTooltip);

var _item = require('./item.web');

var _item2 = _interopRequireDefault(_item);

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

function recursiveCloneChildren(children) {
    var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (ch, _i) {
        return ch;
    };

    return _react2["default"].Children.map(children, function (child, index) {
        var newChild = cb(child, index);
        if (newChild && newChild.props && newChild.props.children) {
            return _react2["default"].cloneElement(newChild, {}, recursiveCloneChildren(newChild.props.children, cb));
        }
        return newChild;
    });
}

var Popover = function (_React$Component) {
    (0, _inherits3["default"])(Popover, _React$Component);

    function Popover() {
        (0, _classCallCheck3["default"])(this, Popover);
        return (0, _possibleConstructorReturn3["default"])(this, _React$Component.apply(this, arguments));
    }

    Popover.prototype.render = function render() {
        var _splitObject = (0, _splitObject4["default"])(this.props, ['children', 'prefixCls', 'placement', 'trigger', 'overlay', 'onSelect', 'popupAlign']),
            _splitObject2 = (0, _slicedToArray3["default"])(_splitObject, 2),
            _splitObject2$ = _splitObject2[0],
            children = _splitObject2$.children,
            prefixCls = _splitObject2$.prefixCls,
            placement = _splitObject2$.placement,
            trigger = _splitObject2$.trigger,
            overlay = _splitObject2$.overlay,
            onSelect = _splitObject2$.onSelect,
            popupAlign = _splitObject2$.popupAlign,
            restProps = _splitObject2[1];

        var newChildren = recursiveCloneChildren(overlay, function (child, index) {
            var extraProps = {
                firstItem: false,
                onClick: function onClick() {}
            };
            if (child && child.type && child.type.myName === 'PopoverItem' && !child.props.disabled) {
                extraProps.onClick = function () {
                    onSelect(child);
                };
                extraProps.firstItem = index === 0;
                return _react2["default"].cloneElement(child, extraProps);
            }
            return child;
        });
        return _react2["default"].createElement(_rcTooltip2["default"], __assign({ prefixCls: prefixCls, placement: placement, trigger: trigger, overlay: newChildren, popupAlign: popupAlign }, restProps), children);
    };

    return Popover;
}(_react2["default"].Component);

exports["default"] = Popover;

Popover.defaultProps = {
    prefixCls: 'am-popover',
    placement: 'bottomRight',
    popupAlign: { overflow: { adjustY: 0, adjustX: 0 } },
    trigger: ['click'],
    onSelect: function onSelect() {}
};
Popover.Item = _item2["default"];
module.exports = exports['default'];