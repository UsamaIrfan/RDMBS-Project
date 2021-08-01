"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.productByCatagory = exports.getProductCount = exports.getProducts = exports.addProduct = void 0;

var _index = require("../config/index.js");

var addProduct = function addProduct(productName, productBarcode, productExpiry, productCatagory, productPrice, subCatId, productBuyPrice, discount, profitPercent, register_date, res) {
  if (productPrice < 1 || productBuyPrice < 1) {
    res.send("Please Add a valid product price");
    return;
  }

  var sqlInsertProduct = function sqlInsertProduct(id) {
    return "INSERT INTO products \n    (product_id, product_name, ".concat(productBarcode ? "product_barcode," : "", " product_expiry, parent_id, register_date, subcat_id) VALUES \n    (").concat(id, ", '").concat(productName, "', '").concat(productBarcode ? "".concat(productBarcode, ",") : "", "' '").concat(productExpiry, "', ").concat(productCatagory, ", '").concat(register_date, "', ").concat(subCatId, ");");
  };

  var sqlGetProductCount = "SELECT COUNT(*) FROM inventorysystem.products;";

  var sqlInsertPrice = function sqlInsertPrice(id) {
    return "INSERT INTO product_price \n    (pp_productId, pp_buyingPrice, pp_sellingPrice, pp_discount, pp_profitPercentage) VALUES \n    (".concat(id, ", ").concat(productBuyPrice, ", ").concat(productPrice, ", ").concat(discount ? discount : null, ", ").concat(profitPercent ? profitPercent : null, ");");
  };

  _index.db.query(sqlGetProductCount, function (err, resolve) {
    if (!err && resolve) {
      var count = resolve ? resolve[0]["COUNT(*)"] : 0;
      var id = parseInt("".concat(productCatagory).concat(count));

      _index.db.query(sqlInsertProduct(id), function (err, resolve) {
        if (!err && resolve) {
          _index.db.query(sqlInsertPrice(id), function (err, resolve) {
            res.send({
              success: true,
              message: "Added Successfully"
            });
          });
        } else {
          res.send(err ? err : resolve);
        }
      });
    } else {
      res.send(err ? err : resolve);
    }
  });
};

exports.addProduct = addProduct;

var getProducts = function getProducts(lowLimit, highLimit, res) {
  var sqlGetProducts = "SELECT * FROM products ".concat(lowLimit && highLimit ? "LIMIT ".concat(lowLimit, ", ").concat(highLimit) : "", ";");

  _index.db.query(sqlGetProducts, function (err, products) {
    if (!err && products) {
      res.send({
        success: true,
        List: products
      });
    } else {
      res.send(err);
    }
  });
};

exports.getProducts = getProducts;

var getProductCount = function getProductCount(res) {
  var sqlGetProductsCount = "SELECT COUNT(*) FROM inventorysystem.products;";

  _index.db.query(sqlGetProductsCount, function (err, productCount) {
    var count = productCount ? productCount[0]["COUNT(*)"] : 0;

    if (!err && productCount) {
      res.send({
        success: true,
        count: count
      });
    } else {
      res.send({
        success: false,
        message: "Unable to get Product Count.",
        error: err
      });
    }
  });
};

exports.getProductCount = getProductCount;

var productByCatagory = function productByCatagory(id, res) {
  var sqlGetProducts = "SELECT * FROM products WHERE parent_id = ".concat(id, ";");
  var sqlGetProductsCount = "SELECT COUNT(*) FROM inventorysystem.products;";

  _index.db.query(sqlGetProducts, function (err, products) {
    if (!err && products) {
      _index.db.query(sqlGetProductsCount, function (err, productCount) {
        var count = productCount ? productCount[0]["COUNT(*)"] : 0;
        res.send({
          success: true,
          List: products,
          count: count
        });
      });
    } else {
      res.send(err);
    }
  });
};

exports.productByCatagory = productByCatagory;