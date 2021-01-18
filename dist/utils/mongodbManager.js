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

var _mongodb = require("mongodb");

require('dotenv').config();

var MONGODB_URI = process.env.MONGODB_URI;
var MONGODB_NAME = process.env.MONGODB_NAME;
/**
 * Mongodb Client Manager
 */

var MongodbManager = /*#__PURE__*/function () {
  function MongodbManager() {
    (0, _classCallCheck2["default"])(this, MongodbManager);
  }

  (0, _createClass2["default"])(MongodbManager, [{
    key: "connectDb",
    value: function () {
      var _connectDb = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this._client = new _mongodb.MongoClient(MONGODB_URI, {
                  useUnifiedTopology: true
                });
                _context.next = 3;
                return this._client.connect();

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function connectDb() {
        return _connectDb.apply(this, arguments);
      }

      return connectDb;
    }()
  }, {
    key: "getDbClient",
    value: function getDbClient() {
      if (!this._client) throw new Error('Mongodb client connection issue');
      return this._client.db(MONGODB_NAME);
    }
  }, {
    key: "close",
    value: function () {
      var _close = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!this._client) {
                  _context2.next = 3;
                  break;
                }

                _context2.next = 3;
                return this._client.close();

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function close() {
        return _close.apply(this, arguments);
      }

      return close;
    }()
  }, {
    key: "dropDatabase",
    value: function () {
      var _dropDatabase = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!this._client) {
                  _context3.next = 3;
                  break;
                }

                _context3.next = 3;
                return this._client.db(MONGODB_NAME).dropDatabase();

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function dropDatabase() {
        return _dropDatabase.apply(this, arguments);
      }

      return dropDatabase;
    }()
  }], [{
    key: "getInstance",
    value: function getInstance() {
      if (!MongodbManager.instance) {
        MongodbManager.instance = new MongodbManager();
      }

      return MongodbManager.instance;
    }
  }]);
  return MongodbManager;
}();

exports["default"] = MongodbManager;