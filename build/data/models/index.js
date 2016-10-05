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

var _TTTMove = require('./TTTMove');

var _TTTMove2 = _interopRequireDefault(_TTTMove);

var _Player = require('./Player');

var _Player2 = _interopRequireDefault(_Player);

var _Match = require('./Match');

var _Match2 = _interopRequireDefault(_Match);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function sync() {
  return _db2.default.sync.apply(_db2.default, arguments);
}

exports.default = { sync: sync };