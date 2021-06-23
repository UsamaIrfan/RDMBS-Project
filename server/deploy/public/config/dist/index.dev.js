"use strict";

var mysql = require("mysql");

var db = mysql.createPool({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "password",
  database: 'inventorysystem'
});
module.exports = db;