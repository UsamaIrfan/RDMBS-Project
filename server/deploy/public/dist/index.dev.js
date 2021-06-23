"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var express = require("express");

var bodyParser = require("body-parser");

var mysql = require("mysql");

var cors = require("cors");

var url = require('url');

var app = express();
var db = mysql.createPool({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "password",
  database: 'inventorysystem'
});
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.get("/", function (req, res) {
  res.send("Working");
});
app.post("/api/addproduct", function (req, res) {
  var productName = req.body.productName;
  var productBarcode = req.body.barcode;
  var productExpiry = req.body.expiry;
  var productCatagory = req.body.catagoryId;
  var productPrice = req.body.productPrice;
  var subCatId = req.body.subCatId;
  var productBuyPrice = req.body.buyPrice;
  var discount = req.body.discount;
  var profitPercent = req.body.profitPercent;
  var register_date = req.body.register_date;
  console.log(req.body);

  if (productPrice < 1) {
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

  db.query(sqlGetProductCount, function (err, resolve) {
    if (!err && resolve) {
      var count = resolve ? resolve[0]["COUNT(*)"] : 0;
      var id = parseInt("".concat(productCatagory).concat(count));
      db.query(sqlInsertProduct(id), function (err, resolve) {
        if (!err && resolve) {
          db.query(sqlInsertPrice(id), function (err, resolve) {
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
});
app.get("/api/getproducts", function (req, res) {
  var sqlGetProducts = "SELECT * FROM products;";
  var sqlGetProductsCount = "SELECT COUNT(*) FROM inventorysystem.products;"; // const sqlInsertPrice = (id) =>
  //     `INSERT INTO product_price 
  // (pp_productId, pp_buyingPrice, pp_sellingPrice, pp_discount, pp_profitPercentage) VALUES 
  // (${id}, ${productBuyPrice}, ${productPrice}, ${discount ? discount : null}, ${profitPercent ? profitPercent : null});`

  db.query(sqlGetProducts, function (err, products) {
    if (!err && products) {
      db.query(sqlGetProductsCount, function (err, productCount) {
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
});
app.get("/api/getproduct", function (req, res) {
  var product_id = req.query.id;
  var sqlGetProduct = "SELECT * FROM products WHERE product_id = ".concat(product_id, " LIMIT 1;");
  var sqlGetPrice = "SELECT * FROM product_price WHERE pp_productId = ".concat(product_id, " LIMIT 1;");
  db.query(sqlGetProduct, function (err, product) {
    if (!err && product) {
      db.query(sqlGetPrice, function (err, price) {
        if (!err && price) {
          res.send({
            success: true,
            product: _objectSpread({}, product[0], {}, price[0])
          });
        } else {
          res.send({
            success: false,
            message: "Unable TO Get Pricing.",
            error: err
          });
        }
      });
    } else {
      res.send({
        success: false,
        message: "Unable to Get Product",
        error: err
      });
    }
  });
});
app["delete"]("/api/delproduct", function (req, res) {
  var product_id = req.query.id;
  var sqlDeleteProduct = "DELETE FROM products WHERE product_id = ".concat(product_id, " LIMIT 1;");
  var sqlGetProductsCount = "SELECT COUNT(*) FROM inventorysystem.products;"; // const sqlInsertPrice = (id) =>
  //     `INSERT INTO product_price 
  // (pp_productId, pp_buyingPrice, pp_sellingPrice, pp_discount, pp_profitPercentage) VALUES 
  // (${id}, ${productBuyPrice}, ${productPrice}, ${discount ? discount : null}, ${profitPercent ? profitPercent : null});`

  db.query(sqlDeleteProduct, function (err, product) {
    if (!err && product) {
      res.send({
        success: true,
        message: "Product Deleted"
      });
    } else {
      res.send({
        success: false,
        message: err
      });
    }
  });
});
app.post("/api/addcatagory", function (req, res) {
  var catName = req.body.catName;
  var catActive = req.body.catActive;
  var regDate = req.body.regDate;
  var subCats = req.body.subCats;

  var sqlInsertCatagory = function sqlInsertCatagory(id) {
    return "INSERT INTO categories \n    (categories_id, categories_name, categories_isActive, register_date) VALUES \n    (".concat(id, ", '").concat(catName, "', '").concat(catActive, "', '").concat(regDate, "');");
  };

  var sqlGetCatagoryCount = "SELECT COUNT(*) FROM inventorysystem.categories;";
  db.query(sqlGetCatagoryCount, function (err, resolve) {
    var count = resolve ? resolve[0]["COUNT(*)"].toString().concat(Math.floor(Math.random() * 10) + 1) : 0;
    db.query(sqlInsertCatagory(count), function (err, resolve) {
      if (!err && resolve && count != 0) {
        var sqlQuery = "INSERT INTO sub_catagories (subcat_name, catagory_id) VALUES ";
        subCats.forEach(function (item) {
          sqlQuery = sqlQuery.concat("('".concat(item.text, "', ").concat(count, "),"));
        });
        db.query(sqlQuery.substring(0, sqlQuery.length - 1), function (err, resolve) {
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
});
app.get("/api/getcatagories", function (req, res) {
  var sqlGetCategories = "SELECT * FROM categories;";
  var sqlGetProductsCount = "SELECT COUNT(*) FROM inventorysystem.categories;"; // const sqlInsertPrice = (id) =>
  //     `INSERT INTO product_price 
  // (pp_productId, pp_buyingPrice, pp_sellingPrice, pp_discount, pp_profitPercentage) VALUES 
  // (${id}, ${productBuyPrice}, ${productPrice}, ${discount ? discount : null}, ${profitPercent ? profitPercent : null});`

  db.query(sqlGetCategories, function (err, catagories) {
    if (!err && catagories) {
      db.query(sqlGetProductsCount, function (err, catCount) {
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
});
app.get("/api/getsubcats", function (req, res) {
  var cat_id = req.query.id;

  var sqlGetSubCategories = function sqlGetSubCategories(id) {
    return "SELECT * FROM sub_catagories WHERE catagory_id = ".concat(id, ";");
  };

  var sqlGetProductsCount = "SELECT COUNT(*) FROM inventorysystem.sub_catagories WHERE catagory_id = ".concat(cat_id, ";");
  db.query(sqlGetSubCategories(cat_id), function (err, catagories) {
    if (!err && catagories) {
      db.query(sqlGetProductsCount, function (err, subCatCount) {
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
}); // prodAPIs.getproducts()

app.listen(3001, function () {
  console.log("Running on Port 3001");
});