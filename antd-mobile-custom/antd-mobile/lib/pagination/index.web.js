'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = undefined;

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

var _button = require('../button');

var _button2 = _interopRequireDefault(_button);

var _flex = require('../flex');

var _flex2 = _interopRequireDefault(_flex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function noop() {}

var Pagination = function (_React$Component) {
    (0, _inherits3["default"])(Pagination, _React$Component);

    function Pagination(props) {
        (0, _classCallCheck3["default"])(this, Pagination);

        var _this = (0, _possibleConstructorReturn3["default"])(this, _React$Component.call(this, props));

        _this.state = {
            current: props.current
        };
        _this.onPrev = _this.onPrev.bind(_this);
        _this.onNext = _this.onNext.bind(_this);
        return _this;
    }

    Pagination.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        this.setState({
            current: nextProps.current
        });
    };

    Pagination.prototype._hasPrev = function _hasPrev() {
        return this.state.current > 0;
    };

    Pagination.prototype._hasNext = function _hasNext() {
        return this.state.current < this.props.total;
    };

    Pagination.prototype._handleChange = function _handleChange(p) {
        this.setState({
            current: p
        });
        if (this.props.onChange) {
            this.props.onChange(p);
        }
        return p;
    };

    Pagination.prototype.onPrev = function onPrev() {
        this._handleChange(this.state.current - 1);
    };

    Pagination.prototype.onNext = function onNext() {
        this._handleChange(this.state.current + 1);
    };

    Pagination.prototype.getIndexes = function getIndexes(count) {
        var arr = [];
        for (var i = 0; i < count; i++) {
            arr.push(i);
        }
        return arr;
    };

    Pagination.prototype.render = function render() {
        var _props = this.props,
            prefixCls = _props.prefixCls,
            className = _props.className,
            mode = _props.mode,
            total = _props.total,
            simple = _props.simple,
            prevText = _props.prevText,
            nextText = _props.nextText;

        var current = this.state.current;
        var numWrapCls = (0, _classnames2["default"])((0, _defineProperty3["default"])({
            className: className
        }, prefixCls + '-wrap', true));
        var markup = void 0;
        switch (mode) {
            case 'button':
                markup = _react2["default"].createElement(_flex2["default"], null, _react2["default"].createElement(_flex2["default"].Item, { className: prefixCls + '-wrap-btn ' + prefixCls + '-wrap-btn-prev' }, _react2["default"].createElement(_button2["default"], { inline: true, disabled: current <= 0, onClick: this.onPrev }, prevText)), this.props.children ? _react2["default"].createElement(_flex2["default"].Item, null, this.props.children) : !simple && _react2["default"].createElement(_flex2["default"].Item, { className: numWrapCls }, _react2["default"].createElement("span", { className: "active" }, current + 1), "/", _react2["default"].createElement("span", null, total)), _react2["default"].createElement(_flex2["default"].Item, { className: prefixCls + '-wrap-btn ' + prefixCls + '-wrap-btn-next' }, _react2["default"].createElement(_button2["default"], { disabled: current >= total - 1, inline: true, onClick: this.onNext }, nextText)));
                break;
            case 'number':
                markup = _react2["default"].createElement("div", { className: numWrapCls }, _react2["default"].createElement("span", { className: "active" }, current + 1), "/", _react2["default"].createElement("span", null, total));
                break;
            case 'pointer':
                var indexes = this.getIndexes(total);
                markup = _react2["default"].createElement("div", { className: numWrapCls }, indexes.map(function (index) {
                    var _classNames2;

                    var dotCls = (0, _classnames2["default"])((_classNames2 = {}, (0, _defineProperty3["default"])(_classNames2, prefixCls + '-wrap-dot', true), (0, _defineProperty3["default"])(_classNames2, prefixCls + '-wrap-dot-active', index === current), _classNames2));
                    return _react2["default"].createElement("div", { className: dotCls, key: 'dot-' + index }, _react2["default"].createElement("span", null));
                }));
                break;
            default:
                markup = false;
                break;
        }
        return _react2["default"].createElement("div", { className: prefixCls }, markup);
    };

    return Pagination;
}(_react2["default"].Component);

exports["default"] = Pagination;

Pagination.defaultProps = {
    prefixCls: 'am-pagination',
    mode: 'button',
    current: 0,
    simple: false,
    prevText: 'Prev',
    nextText: 'Next',
    onChange: noop
};
module.exports = exports['default'];