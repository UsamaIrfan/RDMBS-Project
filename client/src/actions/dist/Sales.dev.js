"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllSales = void 0;

var _actionTypes = require("./actionTypes");

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getAllSales = function getAllSales() {
  return function (dispatch) {
    _axios["default"].get("".concat(_actionTypes.SERVER_API, "/api/getsales?minYear=2016&maxYear=2021&desc=true&orderBy=Sale_Id"), {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(function (response) {
      if (response.data.success === true) {
        dispatch({
          type: _actionTypes.GET_SALES,
          sales: response.data.data
        });
      }
    })["catch"](function (err) {
      console.log(err);
    });
  };
};

exports.getAllSales = getAllSales;