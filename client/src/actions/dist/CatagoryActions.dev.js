"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllCatagories = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _actionTypes = require("./actionTypes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getAllCatagories = function getAllCatagories() {
  return function (dispatch) {
    _axios["default"].get("".concat(_actionTypes.SERVER_API, "/api/getcatagories"), {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(function (response) {
      if (response.data.success === true) {
        dispatch({
          type: _actionTypes.GET_CATAGORIES,
          catagories: response.data.List
        });
      }
    })["catch"](function (err) {
      console.log(err);
    });
  };
};

exports.getAllCatagories = getAllCatagories;