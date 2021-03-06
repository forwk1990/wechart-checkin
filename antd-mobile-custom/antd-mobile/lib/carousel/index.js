'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTimerMixin = require('react-timer-mixin');

var _reactTimerMixin2 = _interopRequireDefault(_reactTimerMixin);

var _pagination = require('../pagination');

var _pagination2 = _interopRequireDefault(_pagination);

var _reactNative = require('react-native');

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

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

var _Dimensions$get = _reactNative.Dimensions.get('window'),
    width = _Dimensions$get.width,
    height = _Dimensions$get.height;

var ViewPager = _react2["default"].createClass({
    displayName: 'ViewPager',

    mixins: [_reactTimerMixin2["default"]],
    getDefaultProps: function getDefaultProps() {
        return {
            bounces: true,
            infinite: false,
            dots: true,
            autoplay: false,
            autoplayTimeout: 2.5,
            selectedIndex: 0
        };
    },
    componentWillMount: function componentWillMount() {
        this.state = this.initState(this.props);
    },
    componentDidMount: function componentDidMount() {
        this.autoplay();
    },
    initState: function initState(props) {
        // set the current state
        // const state = this.state || {};
        var count = props.children ? props.children.length || 1 : 0;
        width = props.width || width;
        height = props.height || height;
        var selectedIndex = count > 1 ? Math.min(props.selectedIndex, count - 1) : 0;
        var initState = {
            width: width,
            height: height,
            isScrolling: false,
            autoplayEnd: false,
            loopJump: false,
            count: count,
            selectedIndex: selectedIndex,
            offset: {
                x: width * (selectedIndex + (props.infinite ? 1 : 0)),
                y: 0
            }
        };
        return initState;
    },
    loopJump: function loopJump() {
        var _this = this;

        if (this.state.loopJump) {
            (function () {
                var index = _this.state.selectedIndex + (_this.props.infinite ? 1 : 0);
                setTimeout(function () {
                    return _this.refs.scrollview.setPageWithoutAnimation && _this.refs.scrollview.setPageWithoutAnimation(index);
                }, 50);
            })();
        }
    },
    autoplay: function autoplay() {
        var _this2 = this;

        if (!Array.isArray(this.props.children) || !this.props.autoplay || this.state.isScrolling || this.state.autoplayEnd) {
            return;
        }
        clearTimeout(this.autoplayTimer);
        this.autoplayTimer = this.setTimeout(function () {
            if (!_this2.props.infinite && _this2.state.selectedIndex === _this2.state.count - 1) {
                return _this2.setState({ autoplayEnd: true });
            }
            _this2.scrollNextPage();
        }, this.props.autoplayTimeout * 1000);
    },
    onScrollBegin: function onScrollBegin(e) {
        var _this3 = this;

        this.setState({ isScrolling: true });
        this.setTimeout(function () {
            if (_this3.props.onScrollBeginDrag) {
                _this3.props.onScrollBeginDrag(e, _this3.state, _this3);
            }
        });
    },
    onScrollEnd: function onScrollEnd(e) {
        var _this4 = this;

        this.setState({ isScrolling: false });
        // android incompatible
        if (!e.nativeEvent.contentOffset) {
            e.nativeEvent.contentOffset = { x: e.nativeEvent.position * this.state.width };
        }
        this.updateIndex(e.nativeEvent.contentOffset);
        this.setTimeout(function () {
            _this4.autoplay();
            _this4.loopJump();
            if (_this4.props.onMomentumScrollEnd) {
                _this4.props.onMomentumScrollEnd(e, _this4.state, _this4);
            }
        });
    },
    onScrollEndDrag: function onScrollEndDrag(e) {
        var _state = this.state,
            offset = _state.offset,
            selectedIndex = _state.selectedIndex,
            count = _state.count;

        var previousOffset = offset.x;
        var newOffset = e.nativeEvent.x;
        if (previousOffset === newOffset && (selectedIndex === 0 || selectedIndex === count - 1)) {
            this.setState({
                isScrolling: false
            });
        }
    },
    updateIndex: function updateIndex(offset) {
        var state = this.state;
        var selectedIndex = state.selectedIndex;
        var diff = offset.x - state.offset.x;
        var step = state.width;
        var loopJump = false;
        // Do nothing if offset no change.
        if (!diff) {
            return;
        }
        selectedIndex = parseInt(selectedIndex + Math.round(diff / step), 10);
        if (this.props.infinite) {
            if (selectedIndex <= -1) {
                selectedIndex = state.count - 1;
                offset.x = step * state.count;
                loopJump = true;
            } else if (selectedIndex >= state.count) {
                selectedIndex = 0;
                offset.x = step;
                loopJump = true;
            }
        }
        this.setState({
            selectedIndex: selectedIndex,
            offset: offset,
            loopJump: loopJump
        });
        var afterChange = this.props.afterChange;

        if (afterChange) {
            afterChange(selectedIndex);
        }
    },
    scrollNextPage: function scrollNextPage() {
        var _this5 = this;

        if (this.state.isScrolling || this.state.count < 2) {
            return;
        }
        var state = this.state;
        var diff = (this.props.infinite ? 1 : 0) + this.state.selectedIndex + 1;
        var x = 0;
        var y = 0;
        x = diff * state.width;
        if (_reactNative.Platform.OS === 'android') {
            this.refs.scrollview.setPage(diff);
        } else {
            this.refs.scrollview.scrollTo({ x: x, y: y });
        }
        this.setState({
            isScrolling: true,
            autoplayEnd: false
        });
        // trigger onScrollEnd manually in android
        if (_reactNative.Platform.OS === 'android') {
            this.setTimeout(function () {
                _this5.onScrollEnd({
                    nativeEvent: {
                        position: diff
                    }
                });
            }, 0);
        }
    },
    renderContent: function renderContent(pages) {
        if (_reactNative.Platform.OS === 'ios') {
            var others = {
                onScrollBeginDrag: this.onScrollBegin,
                onMomentumScrollEnd: this.onScrollEnd,
                onScrollEndDrag: this.onScrollEndDrag
            };
            return _react2["default"].createElement(_reactNative.ScrollView, __assign({ ref: "scrollview" }, this.props, { horizontal: true, pagingEnabled: true, bounces: !!this.props.bounces, scrollEventThrottle: 100, removeClippedSubviews: true, automaticallyAdjustContentInsets: false, directionalLockEnabled: true, showsHorizontalScrollIndicator: false, showsVerticalScrollIndicator: false, contentContainerStyle: [_style2["default"].wrapper, this.props.style], contentOffset: this.state.offset }, others), pages);
        } else {
            return _react2["default"].createElement(_reactNative.ViewPagerAndroid, __assign({}, this.props, { ref: "scrollview", initialPage: this.props.infinite ? this.state.selectedIndex + 1 : this.state.selectedIndex, onPageSelected: this.onScrollEnd, style: { flex: 1 } }), pages);
        }
    },
    renderDots: function renderDots(index) {
        return _react2["default"].createElement(_pagination2["default"], { style: _style2["default"].pagination, current: index, mode: "pointer", total: this.state.count });
    },
    render: function render() {
        var state = this.state;
        var props = this.props;
        var children = props.children;
        var count = state.count;
        var infinite = props.infinite;
        var pages = [];
        var pageStyle = [{ width: state.width, height: state.height }, _style2["default"].slide];
        if (!children) {
            return _react2["default"].createElement(_reactNative.Text, { style: { backgroundColor: 'white' } }, "You are supposed to add children inside Carousel");
        }
        // For make infinite at least count > 1
        if (count > 1) {
            pages = Object.keys(children);
            if (infinite) {
                pages.unshift(count - 1 + '');
                pages.push('0');
            }
            pages = pages.map(function (page, i) {
                return _react2["default"].createElement(_reactNative.View, { style: pageStyle, key: i }, children[page]);
            });
        } else {
            pages = _react2["default"].createElement(_reactNative.View, { style: pageStyle }, children);
        }
        return _react2["default"].createElement(_reactNative.View, { style: [_style2["default"].container, {
                width: state.width,
                height: state.height
            }] }, this.renderContent(pages), props.dots && this.renderDots(this.state.selectedIndex));
    }
});
exports["default"] = ViewPager;
module.exports = exports['default'];