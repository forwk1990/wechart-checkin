'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.defaultProps = undefined;

var _index = require('./style/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function noop() {}
var defaultProps = exports.defaultProps = {
    prefixCls: 'am-search',
    placeholder: '',
    onSubmit: noop,
    onChange: noop,
    onFocus: noop,
    onBlur: noop,
    onClear: noop,
    showCancelButton: false,
    cancelText: '取消',
    disabled: false,
    styles: _index2["default"]
};