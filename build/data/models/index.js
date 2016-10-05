'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

var _BlogPost = require('./BlogPost');

var _BlogPost2 = _interopRequireDefault(_BlogPost);

var _Person = require('./Person');

var _Person2 = _interopRequireDefault(_Person);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function sync() {
  return _db2.default.sync.apply(_db2.default, arguments);
}

exports.default = { sync: sync };