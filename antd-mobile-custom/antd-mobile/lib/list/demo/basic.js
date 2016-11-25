'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.description = exports.title = exports["default"] = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _antdMobile = require('antd-mobile');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Brief = _antdMobile.List.Item.Brief;

var styles = _reactNative.StyleSheet.create({
    textAlignRight: {
        textAlign: 'right'
    }
});

var BasicListExample = function (_React$Component) {
    (0, _inherits3["default"])(BasicListExample, _React$Component);

    function BasicListExample() {
        (0, _classCallCheck3["default"])(this, BasicListExample);
        return (0, _possibleConstructorReturn3["default"])(this, _React$Component.apply(this, arguments));
    }

    BasicListExample.prototype.render = function render() {
        return _react2["default"].createElement(_reactNative.ScrollView, { style: { flex: 1, backgroundColor: '#f5f5f9' }, automaticallyAdjustContentInsets: false, showsHorizontalScrollIndicator: false, showsVerticalScrollIndicator: false }, _react2["default"].createElement(_antdMobile.List, { renderHeader: function renderHeader() {
                return '基本 列表头部';
            }, renderFooter: function renderFooter() {
                return '列表尾部';
            } }, _react2["default"].createElement(_antdMobile.List.Item, null, "标题文字,没有设置onClick则点击无反馈"), _react2["default"].createElement(_antdMobile.List.Item, { onClick: function onClick() {
                return alert('点击触发onClick事件');
            } }, "标题文字"), _react2["default"].createElement(_antdMobile.List.Item, { extra: "内容内容", onClick: function onClick() {}, arrow: "horizontal" }, "标题文字")), _react2["default"].createElement(_antdMobile.List, { renderHeader: function renderHeader() {
                return '带缩略图';
            } }, _react2["default"].createElement(_antdMobile.List.Item, { thumb: "https://os.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png", arrow: "horizontal", onClick: function onClick() {} }, "thumb"), _react2["default"].createElement(_antdMobile.List.Item, { thumb: "https://os.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png", onClick: function onClick() {} }, "thumb"), _react2["default"].createElement(_antdMobile.List.Item, { extra: _react2["default"].createElement(_reactNative.Image, { source: { uri: 'https://os.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png' }, style: { width: 29, height: 29 } }), arrow: "horizontal", onClick: function onClick() {} }, "extra为Image")), _react2["default"].createElement(_antdMobile.List, { renderHeader: function renderHeader() {
                return _react2["default"].createElement(_reactNative.Text, null, "箭头方向");
            } }, _react2["default"].createElement(_antdMobile.List.Item, { extra: "horizontal,箭头向右", arrow: "horizontal", onClick: function onClick() {} }, "标题文字"), _react2["default"].createElement(_antdMobile.List.Item, { extra: "down,箭头向下", arrow: "down", onClick: function onClick() {} }, "标题文字"), _react2["default"].createElement(_antdMobile.List.Item, { extra: "up,箭头向上", arrow: "up", onClick: function onClick() {} }, "标题文字"), _react2["default"].createElement(_antdMobile.List.Item, { extra: "empty,有箭头坑位", arrow: "empty", onClick: function onClick() {}, multipleLine: true }, "标题文字"), _react2["default"].createElement(_antdMobile.List.Item, { extra: "没有箭头", onClick: function onClick() {} }, "标题文字")), _react2["default"].createElement(_antdMobile.List, { renderHeader: function renderHeader() {
                return '多行列表 Demo';
            } }, _react2["default"].createElement(_antdMobile.List.Item, { multipleLine: true, arrow: "horizontal", extra: _react2["default"].createElement(_reactNative.View, null, "内容内容", _react2["default"].createElement(Brief, { style: styles.textAlignRight }, "辅助文字内容")) }, "标题文字", _react2["default"].createElement(Brief, null, "辅助文字内容")), _react2["default"].createElement(_antdMobile.List.Item, { error: true, multipleLine: true, arrow: "horizontal" }, "标题文字", _react2["default"].createElement(Brief, null, "辅助文字内容"), _react2["default"].createElement(Brief, null, "辅助文字内容")), _react2["default"].createElement(_antdMobile.List.Item, { multipleLine: true, arrow: "horizontal" }, "标题文字", _react2["default"].createElement(Brief, null, "辅助文字内容"), _react2["default"].createElement(Brief, null, "辅助文字内容"), _react2["default"].createElement(Brief, null, "辅助文字内容")), _react2["default"].createElement(_antdMobile.List.Item, { multipleLine: true, arrow: "horizontal" }, "标题文字", _react2["default"].createElement(Brief, null, "辅助文字内容"), _react2["default"].createElement(Brief, null, "辅助文字内容"), _react2["default"].createElement(Brief, null, "辅助文字内容"), _react2["default"].createElement(Brief, null, "辅助文字内容")), _react2["default"].createElement(_antdMobile.List.Item, { multipleLine: true, arrow: "down" }, "运营", _react2["default"].createElement(Brief, null, "可进行收款、折扣管理、查看数据等操作。如果文字超长那就省略号")), _react2["default"].createElement(_antdMobile.List.Item, { multipleLine: true, arrow: "up", extra: _react2["default"].createElement(_antdMobile.Button, { size: "small", onPress: function onPress() {
                    return alert(1);
                } }, "按钮") }, "区域经理", _react2["default"].createElement(Brief, null, "可进行收款、折扣管理、查看数据等操作。")), _react2["default"].createElement(_antdMobile.List.Item, { multipleLine: true, arrow: "horizontal", align: 'top', extra: _react2["default"].createElement(_reactNative.View, null, "zhifubao@alipay.com", _react2["default"].createElement(Brief, { style: styles.textAlignRight }, "001")) }, "账户名")), _react2["default"].createElement(_antdMobile.List, { renderHeader: function renderHeader() {
                return '业务例子 Demo';
            } }, _react2["default"].createElement(_antdMobile.List.Item, { extra: "鹿港小镇", arrow: "horizontal" }, "所属门店"), _react2["default"].createElement(_antdMobile.List.Item, { extra: "张三" }, "员工姓名"), _react2["default"].createElement(_antdMobile.List.Item, { extra: "收银员" }, "员工角色"), _react2["default"].createElement(_antdMobile.List.Item, { extra: "13838383756" }, "员工手机"), _react2["default"].createElement(_antdMobile.List.Item, { extra: "只可退自己的" }, "退款权限"), _react2["default"].createElement(_antdMobile.List.Item, { extra: "文本信息", arrow: "horizontal" }, "其他权限"), _react2["default"].createElement(_antdMobile.List.Item, { extra: _react2["default"].createElement(_reactNative.Image, { source: { uri: 'https://os.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png' }, style: { width: 29, height: 29 } }), arrow: "horizontal" }, "员工二维码"), _react2["default"].createElement(_antdMobile.List.Item, { extra: _react2["default"].createElement(_reactNative.View, null, "koubei@alipay.com", _react2["default"].createElement(Brief, { style: styles.textAlignRight }, "002")), arrow: "horizontal", multipleLine: true }, "垂直居中对齐")));
    };

    return BasicListExample;
}(_react2["default"].Component);

exports["default"] = BasicListExample;
var title = exports.title = 'List';
var description = exports.description = 'List Example';