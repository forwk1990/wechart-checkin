'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _antdMobile = require('antd-mobile');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

exports["default"] = function () {
    return _react2["default"].createElement(_reactNative.View, null, _react2["default"].createElement(_antdMobile.WhiteSpace, null), _react2["default"].createElement(_antdMobile.WingBlank, null, _react2["default"].createElement(_antdMobile.Button, null, "default button")), _react2["default"].createElement(_antdMobile.WhiteSpace, null), _react2["default"].createElement(_antdMobile.WingBlank, { style: {
            flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
        } }, _react2["default"].createElement(_antdMobile.Button, { type: "primary", onClick: function onClick(e) {
            return console.log(e);
        } }, "primary button"), _react2["default"].createElement(_antdMobile.Button, { type: "primary", size: "small" }, "primary small button")), _react2["default"].createElement(_antdMobile.WhiteSpace, null), _react2["default"].createElement(_antdMobile.WingBlank, null, _react2["default"].createElement(_antdMobile.Button, { type: "ghost" }, "ghost button")), _react2["default"].createElement(_antdMobile.WhiteSpace, null), _react2["default"].createElement(_antdMobile.WingBlank, null, _react2["default"].createElement(_antdMobile.Button, { type: "warning" }, "warning button")), _react2["default"].createElement(_antdMobile.WhiteSpace, null), _react2["default"].createElement(_antdMobile.WingBlank, null, _react2["default"].createElement(_antdMobile.Button, { activeStyle: false }, "无点击反馈"), _react2["default"].createElement(_antdMobile.WhiteSpace, null), _react2["default"].createElement(_antdMobile.Button, { activeStyle: { backgroundColor: 'red' } }, "自定义点击反馈 style")), _react2["default"].createElement(_antdMobile.WhiteSpace, null), _react2["default"].createElement(_antdMobile.WingBlank, null, _react2["default"].createElement(_antdMobile.Button, { disabled: true }, "default disable button")), _react2["default"].createElement(_antdMobile.WhiteSpace, null), _react2["default"].createElement(_antdMobile.WingBlank, null, _react2["default"].createElement(_antdMobile.Button, { type: "primary", disabled: true }, "primary disable button")), _react2["default"].createElement(_antdMobile.WhiteSpace, null), _react2["default"].createElement(_antdMobile.WingBlank, null, _react2["default"].createElement(_antdMobile.Button, { type: "ghost", disabled: true }, "ghost disable button")));
};

module.exports = exports['default'];