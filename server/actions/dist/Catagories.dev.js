"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSubCatagories = exports.delCatagory = exports.getCatagory = exports.getCats = exports.addCatagory = void 0;

var _index = require("../config/index.js");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var addCatagory = function addCatagory(catName, catActive, regDate, subCats, res) {
  var sqlInsertCatagory = function sqlInsertCatagory(id) {
    return "INSERT INTO categories \n(categories_id, categories_name, categories_isActive, register_date) VALUES \n(".concat(id, ", '").concat(catName, "', '").concat(catActive, "', '").concat(regDate, "');");
  };

  var sqlGetCatagoryCount = "SELECT COUNT(*) FROM inventorysystem.categories;";

  _index.db.query(sqlGetCatagoryCount, function (err, resolve) {
    var count = resolve ? resolve[0]["COUNT(*)"].toString().concat(Math.floor(Math.random() * 10) + 1) : 0;

    _index.db.query(sqlInsertCatagory(count), function (err, resolve) {
      if (!err && resolve && count != 0) {
        var sqlQuery = "INSERT INTO sub_catagories (subcat_name, catagory_id) VALUES ";
        subCats.forEach(function (item) {
          sqlQuery = sqlQuery.concat("('".concat(item.text, "', ").concat(count, "),"));
        });

        _index.db.query(sqlQuery.substring(0, sqlQuery.length - 1), function (err, resolve) {
          if (!err && resolve) {
            res.send({
              success: true,
              message: "Added Successfully."
            });
          } else {
            res.send({
              success: false,
              message: "Failed to Add Product.",
              error: err,
              query: sqlQuery
            });
          }
        });
      } else {
        if (err.code === "ER_DUP_ENTRY") {
          res.send({
            success: false,
            message: "The catagory already exists."
          });
        }
      }
    });
  });
};

exports.addCatagory = addCatagory;

var getCats = function getCats(res) {
  var sqlGetCategories = "SELECT * FROM categories;";
  var sqlGetProductsCount = "SELECT COUNT(*) FROM inventorysystem.categories;";

  _index.db.query(sqlGetCategories, function (err, catagories) {
    if (!err && catagories) {
      _index.db.query(sqlGetProductsCount, function (err, catCount) {
        var count = catCount ? catCount[0]["COUNT(*)"] : 0;
        res.send({
          success: true,
          List: catagories,
          count: count
        });
      });
    } else {
      res.send(err);
    }
  });
};

exports.getCats = getCats;

var getCatagory = function getCatagory(id, res) {
  var sqlGetCatagory = "SELECT * FROM categories WHERE categories_id = ".concat(id, " LIMIT 1;");
  var sqlGetProductsCount = "SELECT COUNT(*) FROM products WHERE parent_id = ".concat(id, ";");

  _index.db.query(sqlGetCatagory, function (err, cat) {
    if (!err && cat) {
      _index.db.query(sqlGetProductsCount, function (err, productCount) {
        var count = productCount ? productCount[0]["COUNT(*)"] : 0;
        res.send({
          success: true,
          catagory: _objectSpread({}, cat[0], {
            products: count
          })
        });
      });
    } else {
      res.send({
        success: false,
        message: "Unable to get Catagory Data.",
        error: err
      });
    }
  });
};

exports.getCatagory = getCatagory;

var delCatagory = function delCatagory(catId, res) {
  var sqlDeleteCatagory = "DELETE FROM categories WHERE categories_id = ".concat(catId, " LIMIT 1;");

  _index.db.query(sqlDeleteCatagory, function (err, cat) {
    if (!err && cat) {
      res.send({
        success: true,
        message: "Catagory Deleted"
      });
    } else {
      res.send({
        success: false,
        message: "Unable To delete Catagory",
        error: err
      });
    }
  });
};

exports.delCatagory = delCatagory;

var getSubCatagories = function getSubCatagories(catId, res) {
  var sqlGetSubCategories = function sqlGetSubCategories(id) {
    return "SELECT * FROM sub_catagories WHERE catagory_id = ".concat(id, ";");
  };

  var sqlGetProductsCount = "SELECT COUNT(*) FROM inventorysystem.sub_catagories WHERE catagory_id = ".concat(catId, ";");

  _index.db.query(sqlGetSubCategories(catId), function (err, catagories) {
    if (!err && catagories) {
      _index.db.query(sqlGetProductsCount, function (err, subCatCount) {
        var count = subCatCount ? subCatCount[0]["COUNT(*)"] : 0;
        res.send({
          success: true,
          List: catagories,
          count: count
        });
      });
    } else {
      res.send(err);
    }
  });
};

exports.getSubCatagories = getSubCatagories;