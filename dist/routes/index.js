"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _getit = _interopRequireDefault(require("./getit.routes"));

var routes = (0, _express.Router)();
routes.use('/v1/', _getit["default"]);
var _default = routes;
exports["default"] = _default;