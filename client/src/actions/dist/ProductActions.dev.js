"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.delCatagory = exports.delProduct = exports.getProductById = exports.getAllProducts = exports.addCatagory = exports.addProduct = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _actionTypes = require("./actionTypes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var addProduct = function addProduct(name, catagory, subCatId, expiry, price, buyPrice, barcode, discount, profitPercent, register_date, success, fail) {
  var postData = {
    productName: name,
    barcode: barcode,
    expiry: expiry,
    subCatId: subCatId,
    catagoryId: catagory,
    productPrice: price,
    buyPrice: buyPrice,
    discount: discount,
    profitPercent: profitPercent,
    register_date: register_date
  };
  return function (dispatch) {
    _axios["default"].post("".concat(_actionTypes.SERVER_API, "/api/addproduct"), postData, {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(function (_ref) {
      var data = _ref.data;

      if (data.success === true) {
        success(true);
        console.log(data);
      } else {
        fail(true);
        console.log(data);
      }
    })["catch"](function (err) {
      console.log(err);
    });
  };
};

exports.addProduct = addProduct;

var addCatagory = function addCatagory(name, isActive, regDate, subCats, successAlert, failAlert) {
  var postData = {
    catName: name,
    catActive: isActive,
    regDate: regDate,
    subCats: subCats
  };
  return function (dispatch) {
    _axios["default"].post("".concat(_actionTypes.SERVER_API, "/api/addcatagory"), postData, {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(function (_ref2) {
      var data = _ref2.data;

      if (data.success === true) {
        successAlert(true);
        console.log(data);
      } else {
        failAlert(true);
        console.log(data);
      }
    })["catch"](function (err) {
      console.log(err);
    });
  };
};

exports.addCatagory = addCatagory;

var getAllProducts = function getAllProducts() {
  return function (dispatch) {
    _axios["default"].get("".concat(_actionTypes.SERVER_API, "/api/getproducts"), {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(function (response) {
      if (response.data.success === true) {
        dispatch({
          type: _actionTypes.GET_PRODUCTS,
          products: response.data.List
        });
      }
    })["catch"](function (err) {
      console.log(err);
    });
  };
};

exports.getAllProducts = getAllProducts;

var getProductById = function getProductById(id) {
  return function (dispatch) {
    _axios["default"].get("".concat(_actionTypes.SERVER_API, "/api/getproduct?id=").concat(id), {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(function (response) {
      if (response.data.success === true) {
        return response.data.product;
      }
    })["catch"](function (err) {
      console.log(err);
    });
  };
};

exports.getProductById = getProductById;

var delProduct = function delProduct(id, successAlert, FailAlert) {
  return function (dispatch) {
    _axios["default"]["delete"]("".concat(_actionTypes.SERVER_API, "/api/delproduct?id=").concat(id), {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(function (response) {
      if (response.data.success === true) {
        successAlert(true);
      } else {
        FailAlert(true);
      }
    })["catch"](function (err) {
      FailAlert();
      console.log(err);
    });
  };
};

exports.delProduct = delProduct;

var delCatagory = function delCatagory(id, successAlert, FailAlert) {
  return function (dispatch) {
    _axios["default"]["delete"]("".concat(_actionTypes.SERVER_API, "/api/delcatagory?id=").concat(id), {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(function (response) {
      if (response.data.success === true) {
        successAlert(true);
      } else {
        FailAlert(true);
      }
    })["catch"](function (err) {
      FailAlert();
      console.log(err);
    });
  };
};

exports.delCatagory = delCatagory;