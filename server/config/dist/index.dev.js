"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connection = exports.db = void 0;

var _mysql = _interopRequireDefault(require("mysql"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var db = _mysql["default"].createPool({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "password",
  database: 'inventorysystem'
});

exports.db = db;

var connection = _mysql["default"].createConnection({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "password",
  database: 'inventorysystem'
});

exports.connection = connection;