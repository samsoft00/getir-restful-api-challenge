"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _getir = _interopRequireDefault(require("../controller/getir.controller"));

var routes = (0, _express.Router)();
routes.post('/getir-records', _getir["default"].fetchRecords);
var _default = routes;
exports["default"] = _default;