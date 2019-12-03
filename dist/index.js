"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _themes = require("./themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var RecursiveKeyValue = function RecursiveKeyValue(_ref) {
  var parent = _ref.parent,
      value = _ref.value,
      theme = _ref.theme,
      padding = _ref.padding,
      deep = _ref.deep;

  // easy types
  if (value === null) {
    return _react["default"].createElement("span", {
      style: {
        color: theme.value["null"]
      }
    }, "null");
  }

  if (typeof value === 'string') {
    return _react["default"].createElement("span", {
      style: {
        color: theme.valueQuotes
      }
    }, "\"", _react["default"].createElement("span", {
      style: {
        color: theme.value.string
      }
    }, value), "\"");
  }

  if (typeof value === 'number') {
    return _react["default"].createElement("span", {
      style: {
        color: theme.value.number
      }
    }, value);
  }

  if (typeof value === 'boolean') {
    return _react["default"].createElement("span", {
      style: {
        color: theme.value["boolean"]
      }
    }, value ? 'true' : 'false');
  } // complex nested


  deep += 1; // array

  if (Array.isArray(value)) {
    return _react["default"].createElement(_react.Fragment, null, _react["default"].createElement("span", {
      style: {
        color: theme.bracket
      }
    }, "["), _react["default"].createElement("div", null, value.map(function (o, i) {
      return _react["default"].createElement("div", {
        style: {
          color: theme.valueQuotes
        },
        key: "".concat(parent, "-").concat(o, "-").concat(i)
      }, Array(deep * padding + 1).join("\xA0"), _react["default"].createElement(RecursiveKeyValue, {
        parent: parent,
        value: o,
        theme: theme,
        padding: padding,
        deep: deep
      }), i === value.length - 1 ? '' : _react["default"].createElement("span", {
        style: {
          color: theme.comma
        }
      }, ","));
    })), _react["default"].createElement("span", {
      style: {
        color: theme.bracket
      }
    }, Array((deep - 1) * padding + 1).join("\xA0"), "]"));
  } // object


  if (_typeof(value) === 'object') {
    var keys = Object.keys(value),
        l = keys.length;
    return _react["default"].createElement(_react.Fragment, null, _react["default"].createElement("span", {
      style: {
        color: theme.brace
      }
    }, "{"), _react["default"].createElement("div", null, keys.map(function (o, i) {
      return _react["default"].createElement("div", {
        key: "".concat(parent, "-").concat(o, "-").concat(i, "-").concat(deep)
      }, _react["default"].createElement("span", null, Array(deep * padding + 1).join("\xA0")), _react["default"].createElement("span", {
        style: {
          color: theme.keyQuotes
        }
      }, "\"", _react["default"].createElement("span", {
        style: {
          color: theme.key
        }
      }, o), "\"", _react["default"].createElement("span", {
        style: {
          color: theme.colon
        }
      }, ":"), "\xA0"), _react["default"].createElement(RecursiveKeyValue, {
        parent: o,
        value: value[o],
        theme: theme,
        padding: padding,
        deep: deep
      }), i === l - 1 ? '' : _react["default"].createElement("span", {
        style: {
          color: theme.comma
        }
      }, ","));
    })), _react["default"].createElement("span", {
      style: {
        color: theme.brace
      }
    }, Array((deep - 1) * padding + 1).join("\xA0"), "}"));
  }

  return value;
};

RecursiveKeyValue.defaultProps = {
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
  return _react["default"].createElement("pre", {
    style: {
      overflow: 'auto',
      backgroundColor: theme.background
    }
  }, _react["default"].createElement(RecursiveKeyValue, {
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
var _default = JSONPretty;
exports["default"] = _default;