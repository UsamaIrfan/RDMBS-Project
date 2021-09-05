"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSales = void 0;

var _index = require("../config/index.js");

var getSales = function getSales(id) {
  var GetSale = "SELECT * FROM inventorysystem.sales\n    WHERE sales.Sale_Id = ".concat(id, ";");

  _index.db.query(GetSale, function (err, sale) {
    if (!err && sale) {
      res.send({
        success: true,
        data: sale
      });
    } else {
      res.send({
        success: false,
        message: "Unable to get sales by Id.",
        error: err
      });
    }
  });
};

exports.getSales = getSales;