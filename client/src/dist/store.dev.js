"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _reduxThunk = _interopRequireDefault(require("redux-thunk"));

var _actionTypes = require("./actions/actionTypes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  sidebarShow: 'responsive',
  user: null,
  products: [],
  catagories: [],
  sales: []
};

var changeState = function changeState() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'set':
      return _objectSpread({}, state, {
        sidebarShow: action.sidebarShow
      });

    case _actionTypes.SET_USER:
      return _objectSpread({}, state, {
        user: action.user
      });

    case _actionTypes.GET_PRODUCTS:
      return _objectSpread({}, state, {
        products: action.products
      });

    case _actionTypes.GET_CATAGORIES:
      return _objectSpread({}, state, {
        catagories: action.catagories
      });

    case _actionTypes.GET_SALES:
      return _objectSpread({}, state, {
        sales: action.sales
      });

    default:
      return state;
  }
};

var store = (0, _redux.createStore)(changeState, (0, _redux.applyMiddleware)(_reduxThunk["default"]));
var _default = store;
exports["default"] = _default;