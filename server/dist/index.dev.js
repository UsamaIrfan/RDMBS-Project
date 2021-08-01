"use strict";

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _mysql = _interopRequireDefault(require("mysql"));

var _cors = _interopRequireDefault(require("cors"));

var _url = _interopRequireDefault(require("url"));

var _index = require("./config/index.js");

var _routes = require("./routes.js");

var _Sales = require("./actions/Sales.js");

var _Products = require("./actions/Products.js");

var _Catagories = require("./actions/Catagories.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.use((0, _cors["default"])());
app.use(_express["default"].json());
app.use(_bodyParser["default"].urlencoded({
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
  (0, _Products.addProduct)(productName, productBarcode, productExpiry, productCatagory, productPrice, subCatId, productBuyPrice, discount, profitPercent, register_date, res);
});
app.get(_routes.GET.GET_PRODUCTS, function (req, res) {
  var lowLimit = req.query.skip;
  var highLimit = req.query.numPerPage;
  (0, _Products.getProducts)(lowLimit, highLimit, res);
});
app.get(_routes.GET.PRODUCT_COUNT, function (req, res) {
  (0, _Products.getProductCount)(res);
});
app.get(_routes.GET.CAT_PRODUCTS, function (req, res) {
  var id = req.query.id;
  (0, _Products.productByCatagory)(id, res);
});
app.get(_routes.GET.GET_PRODUCT, function (req, res) {
  var product_id = req.query.id;
  (0, _Products.getProduct)(product_id, res);
});
app["delete"](_routes.DELETE.DEL_PRODUCT, function (req, res) {
  var product_id = req.query.id;
  (0, _Products.delProduct)(product_id, res);
});
app.post("/api/addcatagory", function (req, res) {
  var catName = req.body.catName;
  var catActive = req.body.catActive;
  var regDate = req.body.regDate;
  var subCats = req.body.subCats;
  (0, _Catagories.addCatagory)(catName, catActive, regDate, subCats, res);
});
app.get(_routes.GET.GET_CATAGORIES, function (req, res) {
  (0, _Catagories.getCats)(res);
});
app.get(_routes.GET.GET_CATAGORY, function (req, res) {
  var id = req.query.id;
  (0, _Catagories.getCatagory)(id, res);
});
app["delete"](_routes.DELETE.DEL_CATAGORY, function (req, res) {
  var catId = req.query.id;
  (0, _Catagories.delCatagory)(catId, res);
});
app.get(_routes.GET.GET_SUBCATAGORIES, function (req, res) {
  var cat_id = req.query.id;
  (0, _Catagories.getSubCatagories)(cat_id, res);
});
app.get(_routes.GET.GET_PRODUCT_TIMELINE, function (req, res) {
  (0, _Products.getProductTimeLine)(res);
});
app.get("/api/getProductsByTimeline", function (req, res) {
  var min = req.query.minYear;
  var max = req.query.maxYear;
  (0, _Products.getProductsByTimeline)(min, max, res);
});
app.get(_routes.GET.SEARCH_PRODUCTS, function (req, res) {
  var search = req.query.search;
  var min = req.query.minYear;
  var max = req.query.maxYear;
  var cat = req.query.catagory;
  var orderBy = req.query.orderBy;
  var desc = req.query.desc;
  var limit = req.query.limit;
  (0, _Products.searchProducts)(search, min, max, cat, orderBy, desc, limit, res);
});
app.get(_routes.GET.GET_SALES, function (req, res) {
  var min = req.query.minYear;
  var max = req.query.maxYear;
  var orderBy = req.query.orderBy;
  var desc = req.query.desc;
  var GetSales = "SELECT * FROM inventorysystem.sales \n        WHERE YEAR(Sale_date) between ".concat(min, " and ").concat(max, "\n        ORDER BY ").concat(orderBy ? orderBy : "Sale_Id", " ").concat(desc ? "DESC" : "ASC", ";");

  _index.db.query(GetSales, function (err, sales) {
    if (!err && sales) {
      res.send({
        success: true,
        data: sales
      });
    } else {
      res.send({
        success: false,
        message: "Unable to get Sales.",
        error: err
      });
    }
  });
});
app.get(_routes.GET.GET_SALE, function (req, res) {
  var id = req.query.id;
  (0, _Sales.getSales)(id, res);
});
app.get(_routes.GET.GET_SALES_TIMELINE, function (req, res) {
  var sqlGetTimeline = "SELECT YEAR(MAX(Sale_date)) as maxYear,YEAR(MIN(Sale_date)) as minYear  FROM sales;";

  _index.db.query(sqlGetTimeline, function (err, Timeline) {
    if (!err && Timeline) {
      res.send({
        success: true,
        data: Timeline[0]
      });
    } else {
      res.send({
        success: false,
        message: "Unable to get Years Timeline.",
        error: err
      });
    }
  });
});
app.post("/api/insertsale", function (req, res) {
  var user = req.body.user;
  var date = req.body.date;
  var totalAmount = req.body.totalAmount;
  var totalDiscount = req.body.totalDiscount;
  var amountGiven = req.body.amountGiven;
  var amountReturned = req.body.amountReturned;
  var paytype = req.body.paytype;
  var status = req.body.status;
  var products = req.body.products;
  (0, _Sales.insertSale)(user, date, totalAmount, totalDiscount, amountGiven, amountReturned, paytype, status, products, res);
});
app.listen(3001, function () {
  console.log("Running on Port 3001");
});