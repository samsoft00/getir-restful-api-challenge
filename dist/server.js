"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _app = _interopRequireDefault(require("./app"));

var _fancyLog = _interopRequireDefault(require("fancy-log"));

var _mongodbManager = _interopRequireDefault(require("./utils/mongodbManager"));

require('dotenv').config();

var dbManager = _mongodbManager["default"].getInstance();

var port = parseInt(process.env.NODE_ENV === 'test' ? 8378 : process.env.PORT, 10) || 8000;

_app["default"].listen(port, /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
  return _regenerator["default"].wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return dbManager.connectDb();

        case 2:
          (0, _fancyLog["default"])("Server is running on http://localhost:".concat(port, " "));

        case 3:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})));