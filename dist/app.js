"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("@babel/polyfill");

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _routes = _interopRequireDefault(require("./routes"));

require('dotenv').config();

var getir = (0, _express["default"])();
var corsOptions = {
  credentials: true,
  origin: true,
  optionsSuccessStatus: 200
};
getir.use((0, _cors["default"])(corsOptions));
getir.use(_bodyParser["default"].urlencoded({
  limit: '50mb',
  extended: true
}));
getir.use(_bodyParser["default"].json()); // routes

getir.use(_routes["default"]); // catch 404 and forward to error handler

getir.use(function (req, res, next) {
  var err = new Error('Resource does not exist');
  err.status = 404;
  err.code = 1;
  next(err);
});
getir.use(function (err, req, res, next) {
  return res.status(err.status || 500).json({
    code: 1,
    msg: err.message
  });
});
var _default = getir;
exports["default"] = _default;