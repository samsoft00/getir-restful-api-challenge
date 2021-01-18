"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _lodash = require("lodash");

var _moment = _interopRequireDefault(require("moment"));

var _mongodbManager = _interopRequireDefault(require("../utils/mongodbManager"));

var Joi = require('joi').extend(require('@joi/date'));

var dbManager = _mongodbManager["default"].getInstance();
/**
 * Getir controller to handle the following methods
 * 1. Fetch records for database
 */


var GetirController = /*#__PURE__*/function () {
  function GetirController() {
    (0, _classCallCheck2["default"])(this, GetirController);
  }

  (0, _createClass2["default"])(GetirController, null, [{
    key: "fetchRecords",
    value: function () {
      var _fetchRecords = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
        var payload, schema, startDate, endDate, minCount, maxCount, findQuery, dbClient, items, r;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                payload = (0, _lodash.pick)(req.body, ['startDate', 'endDate', 'minCount', 'maxCount']);
                _context.prev = 1;
                // joi validation schema
                schema = Joi.object({
                  startDate: Joi.date().format('YYYY-MM-DD').required().error(new Error('Start date is required, must be in YYYY-MM-DD format')),
                  endDate: Joi.date().format('YYYY-MM-DD').greater(Joi.ref('startDate')).required().error(new Error('End date is required, must be greater than startDate')),
                  minCount: Joi.number().strict().required(),
                  maxCount: Joi.number().strict().greater(Joi.ref('minCount')).required().error(new Error('maxCount is required and must be greater than minCount'))
                });
                _context.next = 5;
                return schema.validateAsync(payload);

              case 5:
                startDate = payload.startDate, endDate = payload.endDate, minCount = payload.minCount, maxCount = payload.maxCount;
                startDate = (0, _moment["default"])(startDate, 'YYYY-MM-DD').startOf('day').toDate();
                endDate = (0, _moment["default"])(endDate, 'YYYY-MM-DD').endOf('day').toDate();
                findQuery = [{
                  $match: {
                    createdAt: {
                      $gte: startDate,
                      $lte: endDate
                    }
                  }
                }, {
                  $project: {
                    _id: 0,
                    key: 1,
                    createdAt: 1,
                    totalCount: {
                      $sum: '$counts'
                    }
                  }
                }, {
                  $sort: {
                    totalCount: 1
                  }
                }, {
                  $match: {
                    totalCount: {
                      $gte: minCount,
                      $lte: maxCount
                    }
                  }
                }];
                dbClient = dbManager.getDbClient();
                items = dbClient.collection('records').aggregate(findQuery);
                _context.next = 13;
                return items.toArray();

              case 13:
                r = _context.sent;
                return _context.abrupt("return", res.json({
                  code: 0,
                  msg: 'Success',
                  records: r
                }));

              case 17:
                _context.prev = 17;
                _context.t0 = _context["catch"](1);
                return _context.abrupt("return", res.status(400).json({
                  code: 1,
                  msg: _context.t0.message
                }));

              case 20:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 17]]);
      }));

      function fetchRecords(_x, _x2, _x3) {
        return _fetchRecords.apply(this, arguments);
      }

      return fetchRecords;
    }()
  }]);
  return GetirController;
}();

exports["default"] = GetirController;