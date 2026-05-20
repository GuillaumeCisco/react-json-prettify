"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _themes = require("./themes");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _RecursiveKeyValue = function RecursiveKeyValue(_ref) {
  var parent = _ref.parent,
    value = _ref.value,
    theme = _ref.theme,
    padding = _ref.padding,
    deep = _ref.deep;
  // easy types
  if (value === null) {
    return /*#__PURE__*/_react["default"].createElement("span", {
      style: {
        color: typeof theme["null"] === 'function' ? theme.value["null"](value) : theme.value["null"]
      }
    }, "null");
  }
  if (typeof value === 'string') {
    return /*#__PURE__*/_react["default"].createElement("span", {
      style: {
        color: typeof theme.valueQuotes === 'function' ? theme.valueQuotes(value) : theme.valueQuotes
      }
    }, "\"", /*#__PURE__*/_react["default"].createElement("span", {
      style: {
        color: typeof theme.value.string === 'function' ? theme.value.string(value) : theme.value.string
      }
    }, value), "\"");
  }
  if (typeof value === 'number') {
    return /*#__PURE__*/_react["default"].createElement("span", {
      style: {
        color: typeof theme.value.number === 'function' ? theme.value.number(value) : theme.value.number
      }
    }, value);
  }
  if (typeof value === 'boolean') {
    return /*#__PURE__*/_react["default"].createElement("span", {
      style: {
        color: typeof theme.value["boolean"] === 'function' ? theme.value["boolean"](value) : theme.value["boolean"]
      }
    }, value ? 'true' : 'false');
  }

  // complex nested
  deep += 1;

  // array
  if (Array.isArray(value)) {
    return /*#__PURE__*/_react["default"].createElement(_react.Fragment, null, /*#__PURE__*/_react["default"].createElement("span", {
      style: {
        color: theme.bracket
      }
    }, "["), /*#__PURE__*/_react["default"].createElement("div", null, value.map(function (o, i) {
      return /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          color: theme.valueQuotes
        },
        key: "".concat(parent, "-").concat(o, "-").concat(i)
      }, Array(deep * padding + 1).join("\xA0"), /*#__PURE__*/_react["default"].createElement(_RecursiveKeyValue, {
        parent: parent,
        value: o,
        theme: theme,
        padding: padding,
        deep: deep
      }), i === value.length - 1 ? '' : /*#__PURE__*/_react["default"].createElement("span", {
        style: {
          color: theme.comma
        }
      }, ","));
    })), /*#__PURE__*/_react["default"].createElement("span", {
      style: {
        color: theme.bracket
      }
    }, Array((deep - 1) * padding + 1).join("\xA0"), "]"));
  }

  // object
  if (_typeof(value) === 'object') {
    var keys = Object.keys(value),
      l = keys.length;
    return /*#__PURE__*/_react["default"].createElement(_react.Fragment, null, /*#__PURE__*/_react["default"].createElement("span", {
      style: {
        color: theme.brace
      }
    }, "{"), /*#__PURE__*/_react["default"].createElement("div", null, keys.map(function (o, i) {
      return /*#__PURE__*/_react["default"].createElement("div", {
        key: "".concat(parent, "-").concat(o, "-").concat(i, "-").concat(deep)
      }, /*#__PURE__*/_react["default"].createElement("span", null, Array(deep * padding + 1).join("\xA0")), /*#__PURE__*/_react["default"].createElement("span", {
        style: {
          color: theme.keyQuotes
        }
      }, "\"", /*#__PURE__*/_react["default"].createElement("span", {
        style: {
          color: theme.key
        }
      }, o), "\"", /*#__PURE__*/_react["default"].createElement("span", {
        style: {
          color: theme.colon
        }
      }, ":"), "\xA0"), /*#__PURE__*/_react["default"].createElement(_RecursiveKeyValue, {
        parent: o,
        value: value[o],
        theme: theme,
        padding: padding,
        deep: deep
      }), i === l - 1 ? '' : /*#__PURE__*/_react["default"].createElement("span", {
        style: {
          color: theme.comma
        }
      }, ","));
    })), /*#__PURE__*/_react["default"].createElement("span", {
      style: {
        color: theme.brace
      }
    }, Array((deep - 1) * padding + 1).join("\xA0"), "}"));
  }
  return value;
};
_RecursiveKeyValue.defaultProps = {
  json: null,
  theme: _themes.def,
  padding: 2,
  deep: 0
};
var JSONPretty = function JSONPretty(_ref2) {
  var json = _ref2.json,
    theme = _ref2.theme,
    padding = _ref2.padding;
  // recursive Component
  return /*#__PURE__*/_react["default"].createElement("pre", {
    style: {
      overflow: 'auto',
      backgroundColor: theme.background
    }
  }, /*#__PURE__*/_react["default"].createElement(_RecursiveKeyValue, {
    value: json,
    theme: theme,
    padding: padding,
    parent: "root"
  }));
};
JSONPretty.defaultProps = {
  json: null,
  theme: _themes.def,
  padding: 2
};
JSONPretty.propTypes = {
  json: _propTypes["default"].oneOfType([_propTypes["default"].shape({}), _propTypes["default"].arrayOf(_propTypes["default"].any)]),
  theme: _propTypes["default"].shape({}),
  padding: _propTypes["default"].number
};
var _default = exports["default"] = JSONPretty;