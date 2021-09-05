"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _cluster = _interopRequireDefault(require("cluster"));

var _os = _interopRequireDefault(require("os"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default() {
  var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

  var cpus = _os["default"].cpus().length;

  if (_cluster["default"].isMaster) {
    var _loop = function _loop(i) {
      var worker = _cluster["default"].fork();

      worker.on("message", function (message) {
        console.log("[".concat(worker.process.pid, " to MASTER]"), message);
      });
    };

    for (var i = 0; i < cpus; i++) {
      _loop(i);
    }

    _cluster["default"].on("exit", function (worker) {
      console.warn("[".concat(worker.process.pid, "]"), {
        message: "Process terminated. Restarting."
      });

      _cluster["default"].fork();
    });
  } else {
    if (callback) callback();
  }
};

exports["default"] = _default;